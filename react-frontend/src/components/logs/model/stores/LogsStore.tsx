import { ResponseData } from 'components/user/auth';
import { action, makeObservable, observable } from 'mobx';
import { axiosClient } from 'shared/api/apiClient';
import { LogsData, LogsResponseData } from '../type';
import { logsDataMap } from '../utils/mappers';

export class LogsStore {
  constructor() {
    makeObservable(this);
  }

  @observable logs: LogsData[] = [];

  @action
  getLogs = (organizationId) => {
    return axiosClient
      .get(`/logs?organizationID=${organizationId}`)
      .then((respose: ResponseData<LogsResponseData>) => {
        this.logs = logsDataMap(respose.data.logs);
      });
  };
}
