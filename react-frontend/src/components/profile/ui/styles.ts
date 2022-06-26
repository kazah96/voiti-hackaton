import { makeStyles } from 'shared/theme';

export const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: '50px',
  },
  img: {
    marginRight: 15,
  },
  information: {
    '& > div': {
      border: '1px solid #ccc',
      padding: '5px 10px',
      borderRadius: 5,
      marginBottom: 10,
    },
    '& > div > span': {
      marginRight: 10,
    },
  },
}));
