import { useAuthContext, User } from 'components/user/auth';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CellProps } from 'react-table';
import { Button, Dialog } from 'shared/ui';
import { Table, TableProps } from 'shared/ui/Table';
import { useOrganizationContext } from '../model';
import { SendDataForm } from '../types';
import { AddWorker } from './AddWorker';
import { CustomActionsCell } from './CustomActionsCell';
import { CustomActionsCellForWorkersLogs } from './CustomActionsCellForWorkerLogs';
import { useStyles } from './styles';

export const UsersOrganization = observer(() => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { control, handleSubmit } = useForm();

  const {
    organization: {
      getOrganizationUsers,
      generateKeyByToken,
      addWorker,
      organizationWorkers,
      organizationAdmins,
    },
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
    const result: SendDataForm = {
      ...data,
      organization: [user.organizations[0]],
    };

    addWorker(result).then(() => {
      toggleDialog();
      generateKeyByToken(result.email);
      getOrganizationUsers(user.organizations[0]);
    });
  };

  const columns = useMemo(() => {
    const result: TableProps['columns'] = [
      {
        Header: 'Имя',
        accessor: 'name',
        Cell: (props: CellProps<User>) => <CustomActionsCellForWorkersLogs {...props} />,
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Телефон',
        accessor: 'phone',
      },
      {
        Header: 'Статус',
        accessor: 'isActivateToken',
        Cell: (props) => {
          return <div>{props.value ? 'Активировано' : 'Не активировано'}</div>;
        },
      },
      {
        Header: () => null,
        accessor: 'actions',
        Cell: (props: CellProps<User>) => <CustomActionsCell {...props} />,
        width: 70,
      },
    ];

    return result;
  }, []);

  const rednerAdminsName = useCallback(
    () => organizationAdmins.map((admin) => admin.name).join(', '),
    [organizationAdmins]
  );

  return (
    <div className={classes.table}>
      <div className={classes.blockAdd}>
        <Button variant="outlined" color="primary" onClick={toggleDialog}>
          Добавить сотрудника
        </Button>
        <div className={classes.admins}>Администраторы: {rednerAdminsName()}</div>
      </div>

      <Table columns={columns} data={organizationWorkers} resizable flexible />
      <Dialog open={open} onOk={handleSubmit(onSubmit)}>
        <AddWorker control={control} />
      </Dialog>
    </div>
  );
});
