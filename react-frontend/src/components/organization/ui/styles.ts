import { makeStyles } from 'shared/theme';

export const useStyles = makeStyles(() => ({
  table: {
    paddingTop: 40,
    padding: '0 10px',
  },
  addOrg: {
    textAlign: 'center',
    paddingTop: 20,
  },
  addTitle: {
    fontSize: 33,
    marginBottom: 30,
  },
  blockAdd: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  admins: {
    '& > span': {
      marginRight: 10,
    },
  },
  actionButton: {
    cursor: 'pointer',
  },
}));
