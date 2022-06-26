import React, { createContext, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { OrganizationStore } from '../store/OrganizationStore';

export type IContext = {
  organization: OrganizationStore;
};

const initialState: IContext = {
  organization: new OrganizationStore(),
};

export const OrganizationContext = createContext(initialState);
const { Provider } = OrganizationContext;

export const OrganizationProvider: React.FC = observer(({ children }) => {
  const [state] = useState<IContext>(initialState);

  const contextValue = useMemo(() => ({ ...state }), [state]);

  return <Provider value={contextValue}>{children}</Provider>;
});
