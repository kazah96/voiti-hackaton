import { useMemo } from 'react';
import { Table, TableProps } from 'shared/ui/Table';
import { useStyles } from './styles';

export const UsersOrganization = () => {
  const classes = useStyles();

  const columns = useMemo(() => {
    const result: TableProps['columns'] = [
      {
        Header: 'User',
        accessor: 'user',
        width: 230,
      },
      {
        Header: 'Role',
        accessor: 'role',
        width: 100,
      },
      {
        Header: 'Rating',
        accessor: 'rating',
      },
    ];

    return result;
  }, []);

  const tableData = useMemo(() => [{ user: 'Advocad', role: 'Admin', rating: 5 }], []);

  return (
    <div className={classes.table}>
      <Table columns={columns} data={tableData} resizable flexible />
    </div>
  );
};
