import { useAuthContext } from 'components/user/auth';
import { observer } from 'mobx-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog } from 'shared/ui';
import { Table, TableProps } from 'shared/ui/Table';
import { useOrganizationContext } from '../model';
import { AddWorker } from './AddWorker';
import { useStyles } from './styles';

export const UsersOrganization = observer(() => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { control, handleSubmit } = useForm();

  const {
    organization: { getOrganizationUsers, addWorker, organizationUsers },
  } = useOrganizationContext();
  const {
    auth: { user },
  } = useAuthContext();

  useEffect(() => {
    getOrganizationUsers(user.organizations[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDialog = () => setOpen(!open);

  const onSubmit = (data) => {
    const result = {
      ...data,
      organization: [user.organizations[0]],
    };

    addWorker(result).then(() => {
      toggleDialog();
      getOrganizationUsers(user.organizations[0]);
    });
  };

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
      <Button variant="outlined" color="primary" onClick={toggleDialog}>
        Добавить в организацию
      </Button>
      <Table columns={columns} data={organizationUsers} resizable flexible />
      <Dialog open={open} onOk={handleSubmit(onSubmit)}>
        <AddWorker control={control} />
      </Dialog>
    </div>
  );
});
