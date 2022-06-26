import { LogsData, LogsResponse } from '../type';

export const logsDataMap = (data: LogsResponse[]): LogsData[] => {
  const result = data.map<LogsData>((item) => ({
    id: item._id,
    workerDeviceId: item.workerDeviceId,
    direction: item.direction,
    date: new Date(item.time).toLocaleDateString(),
    workerName: item.workerName,
    gateName: item.gateName,
    isSuccess: item.isSuccess,
  }));

  return result;
};
