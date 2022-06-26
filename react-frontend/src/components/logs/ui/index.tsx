import { observer } from 'mobx-react';
import { useEffect, useMemo } from 'react';
import { Table, TableProps } from 'shared/ui/Table';
import { useLogsContext } from '../model';

export const Logs = observer(() => {
  const {
    logs: { logs, getLogs },
  } = useLogsContext();

  useEffect(() => {
    getLogs();
  }, []);

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
