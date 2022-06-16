import { FC, useEffect, useState } from 'react';
import { getCats } from './network/lib/user';
import useStyles from './styles';

const App: FC = () => {
  const classes = useStyles();
  const [a, b] = useState([]);

  useEffect(() => {
    getCats().then((data) => b(data.data));
  }, []);

  return (
    <div className={classes.container}>
      <h1>Cat list</h1>
      {a.map((item, key) => (
        <div key={key}>
          {item.name} {item.age} {item.breed}
        </div>
      ))}
    </div>
  );
};

export { App };