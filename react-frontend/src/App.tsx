import { FC, useEffect, useState } from 'react';
import { CanvasDrawer } from './canvasDrawer';
import { getCats, getFromPython } from './network/lib/user';
import useStyles from './styles';
import { TestUploadFile } from './TestUploadFile';
import './index.css';

const App: FC = () => {
  const classes = useStyles();
  const [a, b] = useState([]);

  useEffect(() => {
    getFromPython().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className={classes.container}>
      <CanvasDrawer />
      {/* <h1>Cat list</h1> */}

      {/* <TestUploadFile />

      {a.map((item, key) => (
        <div key={key}>
          {item.name} {item.age} {item.breed}
        </div>
      ))} */}
    </div>
  );
};

export { App };
