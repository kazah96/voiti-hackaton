import { Header } from 'components/header';
import { LogsProvider } from 'components/logs';
import { RoadMap } from 'components/logs/ui/RoadMap';
import { observer } from 'mobx-react';
import { useStyles } from './styles';

export const WorkerLogs = observer(() => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.menu}>
        <Header title={'Перемещения сотрудника'} />
      </div>
      <LogsProvider>
        <RoadMap />
      </LogsProvider>
    </div>
  );
});
