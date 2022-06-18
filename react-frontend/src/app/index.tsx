import { Routing } from 'pages';
import { withProviders } from './providers';
import useStyles from './styles';

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Routing />
    </div>
  );
};

export default withProviders(App);
