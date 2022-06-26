export interface LogsData {
  id: string;
  deviceId: string;
  deviceInfo: string;
  date: string;
}

export interface LogsResponse {
  _id: string;
  deviceId: string;
  deviceInfo: string;
  time: Date;
}

export interface LogsResponseData {
  logs: LogsResponse[];
}
