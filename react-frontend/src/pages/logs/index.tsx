import { Header } from 'components/header';
import { Logs } from 'components/logs';
import { useStyles } from './styles';

export const LogsPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Header title="Логирование" />
      <div className={classes.logsTable}>
        <Logs />
      </div>
    </div>
  );
};
