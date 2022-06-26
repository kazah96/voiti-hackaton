import { ResponseData } from 'components/user/auth';
import { action, makeObservable, observable } from 'mobx';
import { axiosClient } from 'shared/api/apiClient';
import { CreateDeviceData, ResponseDeviceData } from '../types';
import { devicesMap } from '../utils/mappers';

export class DeviceStore {
  constructor() {
    makeObservable(this);
  }

  @observable organizationDevice = [];

  @action
  getAllDevices = (organizationId: string) => {
    return axiosClient.get('/devices').then((response: ResponseData<ResponseDeviceData[]>) => {
      this.organizationDevice = devicesMap(response.data, organizationId);
      console.log(devicesMap(response.data, organizationId));
    });
  };

  @action
  createDevice = (data: CreateDeviceData) => {
    return axiosClient.post('/devices/create', data);
  };
}
