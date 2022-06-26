import { useAuthContext } from 'components/user/auth';
import { observer } from 'mobx-react';
import { useEffect, useMemo } from 'react';
import { Table, TableProps } from 'shared/ui/Table';
import { useLogsContext } from '../model';

export const RoadMap = observer(() => {
  const {
    logs: { logs, getLogs },
  } = useLogsContext();
  const {
    auth: { user },
  } = useAuthContext();
  // const {
  //   organization: { organizationWorkers },
  // } = useOrganizationContext();

  // const nameWorker = useMemo(
  //   () => organizationWorkers.find((item) => item._id === param.id),
  //   [organizationWorkers]
  // );

  // console.log(organizationWorkers);

  useEffect(() => {
    if (user) {
      getLogs(user.organizations[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  return <Table columns={columns} data={logs} sorted resizable flexible />;
});
