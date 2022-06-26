import { ResponseData } from 'components/user/auth';
import { action, makeObservable, observable } from 'mobx';
import { axiosClient } from 'shared/api/apiClient';
import { LogsData, LogsResponseData } from '../type';
import { logsDataMap, logsDataUserMap } from '../utils/mappers';

export class LogsStore {
  constructor() {
    makeObservable(this);
  }

  @observable logs: LogsData[] = [];
  @observable logsUser = [];

  @action
  getLogs = (organizationId) => {
    return axiosClient
      .get(`/logs?organizationID=${organizationId}`)
      .then((respose: ResponseData<LogsResponseData>) => {
        this.logs = logsDataMap(respose.data.logs);
      });
  };

  @action
  getLogsUser = (organizationId, deviceId) => {
    return axiosClient
      .get(`/logs?organizationID=${organizationId}`)
      .then((respose: ResponseData<LogsResponseData>) => {
        this.logsUser = logsDataUserMap(respose.data.logs, deviceId);
      });
  };
}
