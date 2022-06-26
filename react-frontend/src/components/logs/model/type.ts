export interface LogsData {
  id: string;
  workerDeviceId: string;
  date: string;
  workerName: string;
  gateName: string;
  isSuccess: boolean;
  direction: 'in' | 'out';
}

export interface LogsResponse {
  _id: string;
  workerDeviceId: string;
  time: string;
  workerName: string;
  gateName: string;
  isSuccess: boolean;
  direction: 'in' | 'out';
}

export interface LogsResponseData {
  logs: LogsResponse[];
}
