export interface ResponseDeviceData {
  _id: string;
  name: string;
  code: string;
  organizationId: string;
  deviceId: string;
}

export interface OrganizationDevice {
  id: string;
  name: string;
  code: string;
  organizationId: string;
  deviceId: string;
}

export interface CreateDeviceData {
  name: string;
  organizationId: string;
}
