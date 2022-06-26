import React, { createContext, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { OrganizationStore } from '../store/OrganizationStore';
import { useAuthContext } from 'components/user/auth';

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
  const {
    auth: { user },
  } = useAuthContext();

  useEffect(() => {
    if (user && !state.organization.organizationId) {
      state.organization.setOrganizationId(user.organizations[0] as string);
      state.organization.getOrganizationUsers(user.organizations[0]);
    }
  }, [state.organization, user]);

  const contextValue = useMemo(() => ({ ...state }), [state]);

  return <Provider value={contextValue}>{children}</Provider>;
});
