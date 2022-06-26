import { ResponseDeviceData } from '../types';

export const devicesMap = (data: ResponseDeviceData[], organizationId: string) => {
  const result = data.filter((item) => {
    if (item.organizationId === organizationId) {
      return {
        id: item._id,
        name: item.name,
        code: item.code,
        organizationId: item.organizationId,
        deviceId: item.deviceId,
      };
    }
  });

  return result;
};
