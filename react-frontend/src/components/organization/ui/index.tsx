import { useAuthContext } from 'components/user/auth';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { AddOrganization } from './AddOrganization';
import { UsersOrganization } from './UsersOrganization';

export const Organization = observer(() => {
  const { auth } = useAuthContext();

  const renderOrg = useMemo(
    () => (auth.user ? <UsersOrganization /> : <AddOrganization />),
    [auth.user]
  );

  return <div>{renderOrg}</div>;
});
