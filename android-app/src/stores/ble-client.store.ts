import {makeAutoObservable, action, observable, computed} from 'mobx';
import {BleManager, Device} from 'react-native-ble-plx';

const serviceUUID = '00009ABA-0000-1000-8000-00805F9B34FB';
const chars = '00009ABE-0000-1000-8000-00805F9B34FB';

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
    // const allChars = await res?.discoverAllServicesAndCharacteristics();
    // const qw = await allChars?.characteristicsForService(serviceUUID);

    // console.error(qw);
    // await qw[0].writeWithResponse('withResponse');
    // console.warn('Tried to send');
    // await qw[0].writeWithoutResponse('withoutResponse');
    // console.warn('Tried to send');
    // // await qw?(
    // //   serviceUUID,
    // //   chars,
    // //   'ebaaakaa',
    // // );

    // await res?.writeCharacteristicWithResponseForService(
    //   serviceUUID,
    //   chars,
    //   'ebaaakaa',
    // );
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
        // Handle error (scanning will be stopped automatically)
        return;
      }
      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
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
