import React, { createContext, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { LogsStory } from '../story/LogsStory';

export type IContext = {
  logs: LogsStory;
};

const initialState: IContext = {
  logs: new LogsStory(),
};

export const LogsContext = createContext(initialState);
const { Provider } = LogsContext;

export const LogsProvider: React.FC = observer(({ children }) => {
  const [state] = useState<IContext>(initialState);

  const contextValue = useMemo(() => ({ ...state }), [state]);

  return <Provider value={contextValue}>{children}</Provider>;
});
