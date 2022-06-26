import HCESession, {NFCContentType, NFCTagType4} from 'react-native-hce';
import {makeAutoObservable, action, computed, observable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ax} from '../network/http';
import DeviceInfo from 'react-native-device-info';
import {makeKey} from '../utils/encryption';
import Toast from 'react-native-toast-message';

export enum TagEventTypes {
  SIMULATION_STARTED,
  SIMULATION_STOPPED,
}

export class TagStore {
  deviceId: string = '';
  contentType: NFCContentType = NFCContentType.Text;

  @observable simulationInstance: HCESession | null = null;

  @observable public token: string = '';
  @observable public ready: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @computed
  public get active() {
    return !!this.simulationInstance && this.ready;
  }

  @action.bound
  public async run() {
    await this.prepare();
    await this.runSimulation();
  }

  @action.bound
  public async prepare() {
    const androidId = await DeviceInfo.getAndroidId();
    await this.updateKeyFromStorage();
    this.deviceId = androidId;
    this.ready = true;
  }

  @action.bound
  public async updateKeyFromStorage() {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      this.token = token;
    }
  }

  @action.bound
  public async setToken(token: string) {
    if (!token) {
      return;
    }

    this.token = token;

    await AsyncStorage.setItem('token', token);
  }

  @action.bound
  public async tryActivate(key: string) {
    await this.prepare();
    await this.updateKeyFromStorage();
    key = key?.toUpperCase();

    if (key) {
      try {
        await this.sendKeyAndGetToken(key);
        return true;
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: 'Ошибка активации',
        });
        return false;
      }
    }
    if (!this.token) {
      Toast.show({
        type: 'error',
        text1: 'Токен не найден',
      });
      return false;
    }

    return true;
  }

  @action.bound
  public async sendKeyAndGetToken(key: string) {
    const result = await ax.post('/workers/generate_token_by_key', {
      key: key.toUpperCase(),
      deviceId: this.deviceId,
    });

    this.setToken(result.data.token);
    return result;
  }

  @action.bound
  public async tryLogin(key: string | null) {
    if (!key && !this.token) {
      Toast.show({
        type: 'error',
        text1: 'Токен не найден',
      });
      return;
    }

    if (key) {
      await this.sendKeyAndGetToken(key);
    }
  }

  @action.bound
  async runSimulation() {
    const tag = new NFCTagType4(this.contentType, this.getKeyForSend());
    this.simulationInstance = await new HCESession(tag).start();
  }

  @action.bound
  async stopSimulation() {
    if (this.simulationInstance) {
      await this.simulationInstance.terminate();
      this.simulationInstance = null;
    }
  }

  private getKeyForSend = () => {
    return makeKey(this.token, this.deviceId);
  };
}
