import { ResponseData } from 'components/user/auth';
import { action, makeObservable, observable } from 'mobx';
import { axiosClient } from 'shared/api/apiClient';
import { LogsData, LogsResponseData } from '../type';
import { logsDataMap } from '../utils/mappers';

export class LogsStory {
  constructor() {
    makeObservable(this);
  }

  @observable logs: LogsData[] = [];

  @action
  getLogs = () => {
    return axiosClient.get('/logs').then((respose: ResponseData<LogsResponseData[]>) => {
      this.logs = logsDataMap(respose.data);
    });
  };
}
