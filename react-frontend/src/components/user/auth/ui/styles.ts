import { makeStyles } from 'shared/theme';

export const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 100,
  },
  content: {
    marginBottom: 20,
    fontSize: 27,
  },
  button: {
    marginTop: '10px !important',
  },
}));
