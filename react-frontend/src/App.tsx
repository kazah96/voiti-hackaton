import { FC, useEffect, useState } from 'react';
import { getEee } from './network/lib/user';
import useStyles from './styles';

const App: FC = () => {
  const classes = useStyles();
  const [a, b] = useState(null);

  useEffect(() => {
    getEee().then((data) => b(data.data));
  }, []);

  return <div className={classes.container}>sdfsdf {a && a.as}</div>;
};

export { App };
