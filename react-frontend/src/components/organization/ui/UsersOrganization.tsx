import { useAuthContext } from 'components/user/auth';
import { observer } from 'mobx-react';
import { useEffect, useMemo } from 'react';
import { Table, TableProps } from 'shared/ui/Table';
import { useOrganizationContext } from '../model';
import { useStyles } from './styles';

export const UsersOrganization = observer(() => {
  const classes = useStyles();
  const {
    organization: { getOrganizationUsers, organizationUsers },
  } = useOrganizationContext();
  const {
    auth: { user },
  } = useAuthContext();

  useEffect(() => {
    getOrganizationUsers(user.organizations[0]);
  }, []);

  const columns = useMemo(() => {
    const result: TableProps['columns'] = [
      {
        Header: 'Имя',
        accessor: 'name',
        width: 230,
      },
      {
        Header: 'Email',
        accessor: 'email',
        width: 100,
      },
    ];

    return result;
  }, []);

  return (
    <div className={classes.table}>
      <Table columns={columns} data={organizationUsers} resizable flexible />
    </div>
  );
});
