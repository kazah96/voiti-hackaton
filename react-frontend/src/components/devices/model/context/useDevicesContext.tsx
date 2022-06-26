import { useContext } from 'react';

import { DevicesContext } from './DevicesProvider';

export const useDevicesContext = () => {
  return useContext(DevicesContext);
};
