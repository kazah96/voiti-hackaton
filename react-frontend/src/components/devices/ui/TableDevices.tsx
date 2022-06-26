import { useOrganizationContext } from 'components/organization';
import { observer } from 'mobx-react';
import { useEffect, useMemo } from 'react';
import { Table, TableProps } from 'shared/ui/Table';
import { useDevicesContext } from '../model/context';
import { useStyles } from './styles';

export const TableDevices = observer(() => {
  const classes = useStyles();

  const {
    organization: { organizationId },
  } = useOrganizationContext();
  const {
    devices: { getAllDevices, organizationDevice },
  } = useDevicesContext();

  useEffect(() => {
    if (organizationId) {
      getAllDevices(organizationId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId]);

  const columns = useMemo(() => {
    const result: TableProps['columns'] = [
      {
        Header: 'Id Девайса',
        accessor: 'deviceId',
      },
      {
        Header: 'Название точки',
        accessor: 'name',
      },
      {
        Header: 'Организация',
        accessor: 'organizationId',
      },
      {
        Header: 'Код',
        accessor: 'code',
      },
    ];

    return result;
  }, []);

  if (organizationDevice.length === 0) {
    return <div className={classes.notDevice}>У вас нет устройств</div>;
  }

  return <Table columns={columns} data={organizationDevice} resizable flexible />;
});
