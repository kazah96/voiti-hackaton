import { LogsData, LogsResponse } from '../type';

export const logsDataMap = (data: LogsResponse[]): LogsData[] => {
  const result = data.map<LogsData>((item) => ({
    id: item._id,
    workerDeviceId: item.workerDeviceId,
    direction: item.direction,
    date: new Date(item.time).toLocaleString(),
    workerName: item.workerName,
    gateName: item.gateName,
    isSuccess: item.isSuccess,
  }));

  return result;
};

export const logsDataUserMap = (data: LogsResponse[], deviceId) => {
  const result = data.filter((item) => {
    if (deviceId?.name === item.workerDeviceId) {
      return {
        id: item._id,
        workerDeviceId: item.workerDeviceId,
        direction: item.direction,
        date: new Date(item.time).toLocaleString(),
        workerName: item.workerName,
        gateName: item.gateName,
        isSuccess: item.isSuccess,
      };
    }
  });

  return result;
};
