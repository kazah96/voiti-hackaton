import {makeAutoObservable, action, observable, computed} from 'mobx';
import {BleManager, Device} from 'react-native-ble-plx';

type Pages = 'addKey' | 'test' | 'client' | 'reader';
class BLEClientStore {
  @observable public currentPage: Pages = 'addKey';
  private manager: BleManager;

  @observable
  public device: Device | null = null;

  constructor() {
    makeAutoObservable(this);
    this.manager = new BleManager();
  }

  @computed
  public get isDeviceFound() {
    return !!this.device;
  }
  @action.bound
  public run() {
    const subscription = this.manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }

  @action.bound
  public async open() {
    await this.device?.connect();

    console.warn('Tried to send');
  }

  @action.bound
  public setDevice(device: Device) {
    console.warn('SETTING DEVICE');
    this.device = device;
  }

  @action.bound
  scanAndConnect() {
    const devices = new Set();
    this.manager.startDeviceScan(null, null, (error, device) => {
      devices.add(device?.id);

      if (error) {
        return;
      }

      if (device && device.name === 'DOOR') {
        this.setDevice(device);
        this.manager.stopDeviceScan();
      }
    });
  }

  @action.bound
  public setCurrentPage(page: Pages) {
    this.currentPage = page;
  }
}

export {BLEClientStore};
