import {makeAutoObservable, action, observable} from 'mobx';
import {ReaderStore} from './reader.store';
import BLEPeripheral from 'react-native-ble-peripheral';
// import {v4} from 'uuid';

import {TagStore} from './tag.store';

type Pages = 'addKey' | 'test' | 'client' | 'reader';

const serviceUUID = 'efcafafc-f528-11ec-b939-0242ac120002';
const chars = 'b2482389-ad9b-42d4-bb75-a95d9e0f9470';
// const serviceUUID = v4();

class BLEPeripheralStore {
  @observable public currentPage: Pages = 'addKey';

  @observable
  public tagStore = new TagStore();

  @observable
  public readerStore = new ReaderStore();

  constructor() {
    makeAutoObservable(this);
  }

  @action.bound
  public async run() {
    BLEPeripheral.addService(serviceUUID, true);
    BLEPeripheral.addCharacteristicToService(serviceUUID, chars, 16 | 1, 8); //this is a Characteristic with read and write permissions and notify property
    // BLEPeripheral.setName('s');
    // BLEPeripheral.sendNotificationToDevices(
    //   serviceUUID,
    //   chars,
    //   [0x10, 0x01, 0xa1, 0x80],
    // ); //sends a notification to all connected devices that, using the char uuid given

    try {
      const result = await BLEPeripheral.start();
      console.warn(result);
    } catch (e) {
      console.warn(e);
    }
  }
}

export {BLEPeripheralStore};
