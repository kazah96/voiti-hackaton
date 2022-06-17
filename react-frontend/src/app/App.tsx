import { Routing } from 'pages';
import { FC } from 'react';
import { withProviders } from './providers';
import useStyles from './styles';

const App: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Routing />
    </div>
  );
};

export default withProviders(App);
