import { useAuthContext } from 'components/user/auth';
import { observer } from 'mobx-react';
import { useEffect, useMemo } from 'react';
import { Table, TableProps } from 'shared/ui/Table';
import { useLogsContext } from '../model';

export const Logs = observer(() => {
  const {
    logs: { logs, getLogs },
  } = useLogsContext();
  const {
    auth: { user },
  } = useAuthContext();

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
        accessor: 'deviceId',
      },
      {
        Header: 'Информация',
        accessor: 'deviceInfo',
      },
      {
        Header: 'Дата',
        accessor: 'date',
      },
    ];

    return result;
  }, []);

  return <Table columns={columns} data={logs} resizable flexible />;
});
