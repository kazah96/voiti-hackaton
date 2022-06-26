import { useOrganizationContext } from 'components/organization';
import { useAuthContext } from 'components/user/auth';
import { observer } from 'mobx-react';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { Table, TableProps } from 'shared/ui/Table';
import { useLogsContext } from '../model';

export const RoadMap = observer(() => {
  const param = useParams();
  const {
    logs: { logsUser, getLogsUser },
  } = useLogsContext();
  const {
    auth: { user },
  } = useAuthContext();
  const {
    organization: { organizationWorkers },
  } = useOrganizationContext();

  const nameDevice = useMemo(
    () => organizationWorkers.find((item) => item._id === param.id),
    [organizationWorkers]
  );

  useEffect(() => {
    if (user && organizationWorkers) {
      getLogsUser(user.organizations[0], nameDevice);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, organizationWorkers]);

  const columns = useMemo(() => {
    const result: TableProps['columns'] = [
      {
        Header: 'Id Девайса',
        accessor: 'workerDeviceId',
      },
      {
        Header: 'Имя пользователя',
        accessor: 'workerName',
      },
      {
        Header: 'Направление',
        accessor: 'direction',
      },
      {
        Header: 'Место',
        accessor: 'gateName',
      },
      {
        Header: 'Дата',
        accessor: 'date',
      },
    ];

    return result;
  }, []);

  return <Table columns={columns} data={logsUser} sorted resizable flexible />;
});
