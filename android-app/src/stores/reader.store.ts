import {makeAutoObservable, action, observable} from 'mobx';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {ax} from '../network/http';
import {Vibration} from 'react-native';
import {parseKey} from '../utils/encryption';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
type KeysTable = {
  [deviceId: string]: string;
};

class ReaderStore {
  @observable
  public deviceKey: string | null = 'OQACHJULDY';
  @observable
  public deviceId = 'asd';
  @observable
  public keysTable: KeysTable = {};

  @observable
  public name = 'Дверь в толчок';

  @observable
  public active = false;
  @observable
  public doorState: 'idle' | 'opened' | 'error' = 'idle';
  private timer: null | number = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  public async tryActivate(key: string | null) {
    key = key?.toUpperCase();
    if (key) {
      try {
        await ax.post(`/devices/${key}/activate`, {
          deviceId: this.deviceId,
        });
        await AsyncStorage.setItem('deviceKey', key);
        this.setDeviceKey(key);

        return false;
      } catch (e) {
        Toast.show({type: 'error', text1: 'Такой ключ активации не найден'});

        //\\vCaIhFUBJ]OPGvlDH"
        return false;
      }
    }

    this.setDeviceKey((await AsyncStorage.getItem('deviceKey')) || '');
    return await this.getInfo();
  }

  @action.bound
  public async getInfo() {
    try {
      // console.warn(this.deviceKey);
      const r = await ax.get(`/devices/${this.deviceKey}/update_base`);
      this.name = r.data.name;
      this.keysTable = r.data.keyDeviceIdPair;
      console.warn(this.name);
      console.warn(this.keysTable);
      return true;
    } catch (e) {
      Toast.show({type: 'error', text1: 'Невозможно запросить данные'});

      return false;
    }
  }

  @action.bound
  public async setDeviceKey(key: string) {
    this.deviceKey = key;
  }

  @action.bound
  public async run() {
    this.beginRead();
  }

  @action.bound
  private async prepare() {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    this.active = true;
  }

  @action.bound
  public async beginRead() {
    await this.prepare();

    if (!this.active) {
      return;
    }
    const tag = await NfcManager.getTag();

    const [token, deviceId] = parseKey(tag?.ndefMessage[0].payload || []);

    console.log('Try open the door');
    this.tryOpenDoor(token, deviceId);

    await NfcManager.cancelTechnologyRequest();

    setTimeout(() => {
      this.beginRead();
    }, 3000);
  }

  @action.bound
  public setDoorState(state: 'idle' | 'opened' | 'error') {
    console.log('state', state);
    this.doorState = state;
  }

  @action.bound
  public handleDoorState(state: 'idle' | 'opened' | 'error') {
    this.setDoorState(state);

    if (state === 'opened') {
      Vibration.vibrate(2000);
    }
    if (state === 'error') {
      Vibration.vibrate([0, 600]);
    }

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(() => {
      this.setDoorState('idle');
    }, 2000);
  }

  @action.bound
  private async sendLog(status: 'success' | 'error') {
    const currentDate = Date.now();
    console.log('sending log');

    const data = {
      time: currentDate,
      deviceId: this.deviceId,
      status,
      deviceInfo: 'ergerg',
    };

    try {
      await ax.post('/logs/add', JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }

  @action.bound
  public tryOpenDoor(pass: string, deviceId: string) {
    console.warn(pass, deviceId);
    console.warn(this.keysTable);
    const isValidEntry =
      this.keysTable[deviceId] && this.keysTable[deviceId] === pass;

    if (this.doorState !== 'idle') {
      return;
    }
    if (!isValidEntry) {
      this.handleDoorState('error');
      this.sendLog('error');
    } else {
      this.handleDoorState('opened');
      this.sendLog('success');
    }
  }
}

export {ReaderStore};
