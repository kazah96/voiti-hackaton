import { makeStyles } from 'shared/theme';

export const useStyles = makeStyles(() => ({
  title: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 38,
    marginBottom: 20,
  },
  menu: {
    'display': 'flex',
    'justifyContent': 'center',
    'width': 900,
    'margin': 'auto',
    'flexWrap': 'wrap',

    '& > div': {
      width: 400,
      height: 250,
      border: '1px solid #ccc',
      borderRadius: 10,
      margin: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  },
  name: {
    textAlign: 'right',
    fontSize: 35,
    padding: 15,
  },
  block: {
    cursor: 'pointer',
  },
}));
