import {makeAutoObservable, action, observable} from 'mobx';
import BLEPeripheral from 'react-native-ble-peripheral';
import {DeviceEventEmitter} from 'react-native';
import Toast from 'react-native-toast-message';

import {RootStore} from './base.store';

type Pages = 'addKey' | 'test' | 'client' | 'reader';

const FIXED_MAC_ADRESSES = ['7D:AC:67:20:B5:5C', '64:7C:D5:F6:4E:0E'];

const serviceUUID = '00009ABA-0000-1000-8000-00805F9B34FB';
const chars = '00009ABE-0000-1000-8000-00805F9B34FB';

class BLEPeripheralStore {
  @observable public currentPage: Pages = 'addKey';

  constructor(private rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);

    DeviceEventEmitter.addListener('onSessionConnect', data => {
      Toast.show({
        text1: 'onConnect' + data,
      });

      const mac = data['sessionId'];

      this.rootStore.readerStore.handleDoorState(
        FIXED_MAC_ADRESSES.includes(mac) ? 'opened' : 'error',
      );
    });

    DeviceEventEmitter.addListener('onWriteResponse', data => {
      Toast.show({
        text1: 'onWriteResponse' + data,
      });
      console.error('FROM BACK RESPONSE');
      console.error(data);
    });
  }

  @action.bound
  public async run() {
    console.warn('getting');

    BLEPeripheral.addCallbacks(item => {
      console.error(String(item));
    });

    BLEPeripheral.addService(serviceUUID, false);
    BLEPeripheral.addCharacteristicToService(
      serviceUUID,
      chars,
      16 | 1,
      8 | 1 | 2,
    ); //this is a Characteristic with read and write permissions and notify property
    BLEPeripheral.setName('DOOR');

    try {
      const result = await BLEPeripheral.start();

      console.warn(result);
    } catch (e) {
      console.warn(e);
    }
  }
}

export {BLEPeripheralStore};
