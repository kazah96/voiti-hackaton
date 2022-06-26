import { LogsData, LogsResponseData } from '../type';

export const logsDataMap = (data: LogsResponseData[]): LogsData[] => {
  const result = data.map((item) => ({
    id: item._id,
    deviceId: item.deviceId,
    deviceInfo: item.deviceInfo,
    date: new Date(item.time).toLocaleDateString(),
  }));

  return result;
};
