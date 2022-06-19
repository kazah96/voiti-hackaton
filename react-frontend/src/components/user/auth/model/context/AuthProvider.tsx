import React, { createContext, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { AuthStore } from '../store/AuthStore';

export type IContext = {
  auth: AuthStore;
};

const initialState: IContext = {
  auth: new AuthStore(),
};

export const AuthContext = createContext(initialState);
const { Provider } = AuthContext;

export const AuthProvider: React.FC = observer(({ children }) => {
  const [state] = useState<IContext>(initialState);

  const contextValue = useMemo(() => ({ ...state }), [state]);

  return <Provider value={contextValue}>{children}</Provider>;
});
