import HCESession, {NFCContentType, NFCTagType4} from 'react-native-hce';
import {EventEmitter} from 'react-native';

export enum TagEventTypes {
  SIMULATION_STARTED,
  SIMULATION_STOPPED,
}
export class TagSimulator {
  deviceId: string | null = null;
  key: string | null = null;
  contentType: NFCContentType = NFCContentType.Text;
  simulationInstance: HCESession | null = null;
  private emitter = new EventEmitter();

  constructor(deviceID: string, key: string, contentType: NFCContentType) {
    this.deviceId = deviceID;
    this.key = key;
    this.contentType = contentType;
  }

  addListener = (eventType: TagEventTypes, callback: () => void) => {
    this.emitter.addListener(String(eventType), callback);
  };

  runSimulation = async () => {
    const tag = new NFCTagType4(this.contentType, this.getContent());
    this.simulationInstance = await new HCESession(tag).start();
    this.emitter.emit(String(TagEventTypes.SIMULATION_STARTED));
  };

  stopSimulation = async () => {
    if (this.simulationInstance) {
      await this.simulationInstance.terminate();
      this.simulationInstance = null;
    }
    this.emitter.emit(String(TagEventTypes.SIMULATION_STOPPED));
  };

  private getContent = () => {
    return this.key + '_' + this.deviceId;
  };
}
