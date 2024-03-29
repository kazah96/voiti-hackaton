import React, { createContext, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { LogsStore } from '../stores/LogsStore';

export type IContext = {
  logs: LogsStore;
};

const initialState: IContext = {
  logs: new LogsStore(),
};

export const LogsContext = createContext(initialState);
const { Provider } = LogsContext;

export const LogsProvider: React.FC = observer(({ children }) => {
  const [state] = useState<IContext>(initialState);

  const contextValue = useMemo(() => ({ ...state }), [state]);

  return <Provider value={contextValue}>{children}</Provider>;
});
