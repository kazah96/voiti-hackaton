import {makeAutoObservable, action, observable} from 'mobx';
import {BleManager} from 'react-native-ble-plx';

const testID = '74:B1:66:F1:E2:B0';
type Pages = 'addKey' | 'test' | 'client' | 'reader';
class BLEClientStore {
  @observable public currentPage: Pages = 'addKey';
  private manager: BleManager;
  //   @observable
  //   public tagStore = new TagStore();

  //   @observable
  //   public blePeripheralStore = new BLEPeripheralStore();

  //   @observable
  //   public readerStore = new ReaderStore();

  constructor() {
    makeAutoObservable(this);
    this.manager = new BleManager();
  }

  @action.bound
  public run() {
    console.warn('run subscr');
    const subscription = this.manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }

  scanAndConnect() {
    const devices = new Set();
    this.manager.startDeviceScan(null, null, (error, device) => {
      devices.add(device?.id);
      console.log(devices);

      //   console.warn(device);
      //   console.warn(device?.localName);
      //   console.warn(device?.serviceData);
      //   console.log('DEVICE');
      //   console.warn(device?.manufacturerData);
      //   console.warn(device?.name);
      //   console.warn(device?.id);
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return;
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (
        device.name === 'TI BLE Sensor Tag' ||
        device.name === 'SensorTag' ||
        device.name === 'Sim9800' ||
        device?.id == testID
        // device.name === 'My BLE Tester' ||
      ) {
        console.warn('Found device');
        // Stop scanning as it's not necessary if you are scanning for one device.
        this.manager.stopDeviceScan();

        device?.connect().then(res => {
          res.discoverAllServicesAndCharacteristics().then(device => {
            device.services().then(e => {
              //   console.log('SERVICES');
              //   console.log(e);
              e.forEach(service => {
                service.characteristics().then(chars => {
                  console.log('CHARS');
                  console.log(chars);
                  chars.forEach(char => {
                    console.log(char.id);
                    console.log(char.uuid);
                    console.log(char.serviceUUID);
                  });
                });
              });
            });
          });
        });

        // Proceed with connection.
      }
    });
  }

  @action.bound
  public setCurrentPage(page: Pages) {
    console.log('setting page');
    this.currentPage = page;
  }
}

export {BLEClientStore};
