import { AddDevice } from './AddDevice';
import { useStyles } from './styles';
import { TableDevices } from './TableDevices';

export const Devices = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <AddDevice />
      <TableDevices />
    </div>
  );
};
