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
    '& > p': {
      margin: 0,
      padding: 0,
    },

    '& > div > span': {
      marginRight: 10,
    },

    '& > div > p': {
      margin: '10px 0 0 0',
    },
  },
}));
