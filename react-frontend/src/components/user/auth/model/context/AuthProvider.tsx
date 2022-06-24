import React, { createContext, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { AuthStore } from '../store/AuthStore';

export type IContext = {
  auth: AuthStore;
  accessToken: string;
};

const initialState: IContext = {
  auth: new AuthStore(),
  accessToken: '',
};

export const AuthContext = createContext(initialState);
const { Provider } = AuthContext;

export const AuthProvider: React.FC = observer(({ children }) => {
  const [state] = useState<IContext>(initialState);
  const accessToken = localStorage.getItem('accessToken') as string | '';

  const contextValue = useMemo(() => ({ ...state, accessToken }), [accessToken, state]);

  return <Provider value={contextValue}>{children}</Provider>;
});
