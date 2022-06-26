import React, { createContext, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { DeviceStore } from '../stores/DeviceStore';

export type IContext = {
  devices: DeviceStore;
};

const initialState: IContext = {
  devices: new DeviceStore(),
};

export const DevicesContext = createContext(initialState);
const { Provider } = DevicesContext;

export const DevicesProvider: React.FC = observer(({ children }) => {
  const [state] = useState<IContext>(initialState);

  const contextValue = useMemo(() => ({ ...state }), [state]);

  return <Provider value={contextValue}>{children}</Provider>;
});
