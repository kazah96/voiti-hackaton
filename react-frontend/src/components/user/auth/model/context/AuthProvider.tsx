import React, { createContext, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { AuthStore } from '../store/AuthStore';

export type IContext = {
  auth: AuthStore;
  accessToken: string;
};

const initialState: IContext = {
  auth: new AuthStore(),
  accessToken: localStorage.getItem('accessToken') as string | '',
};

export const AuthContext = createContext(initialState);
const { Provider } = AuthContext;

export const AuthProvider: React.FC = observer(({ children }) => {
  const [state] = useState<IContext>(initialState);

  const contextValue = useMemo(() => ({ ...state }), [state]);

  return <Provider value={contextValue}>{children}</Provider>;
});
