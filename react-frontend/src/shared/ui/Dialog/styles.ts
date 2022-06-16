import { makeStyles } from 'theme';

type StyleProps = {
  width?: number | string;
};

export default makeStyles(() => ({
  dialog: {
    'padding': '37px 56px',
    'paddingBottom': 40,
    'borderRadius': '16px',
    'overflowX': 'hidden',
    'boxShadow': '0px 2px 7px rgba(0, 0, 0, 0.1), 0px 18px 30px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 550px)': {
      padding: '40px 16px',
      display: 'flex',
      flexDirection: 'column',
      margin: '0 16px',
      width: '100%',
    },
  },
  dialogSize: (props: StyleProps) => ({
    maxWidth: props.width || 688,
    width: '100%',
  }),
  fullScreen: {
    borderRadius: 0,
    maxWidth: 'initial',
    width: '100%',
  },
  fullWidth: {
    maxWidth: '100%',
    width: '100%',
  },
  dialogContent: {},

  title: {
    'fontFamily': 'Open Sans, sans-serif',
    'fontWeight': 'bold',
    'fontSize': '1.188rem',
    'marginBottom': 26,
    'color': '#1C1919',
    '@media (max-width: 550px)': {
      marginBottom: 32,
    },
  },

  body: {
    'paddingBottom': 32,
    'fontFamily': 'Open Sans',
    'fontWeight': 400,
    'fontSize': '1rem',
    'lineHeight': '24px',
    'letterSpacing': '0.005em',

    '&:last-child': {
      paddingBottom: 0,
    },

    '& a, & a:visited': {
      fontWeight: 600,
      textDecoration: 'none',
    },
  },

  footer: {
    'display': 'flex',
    'justifyContent': 'space-between',

    '& > *': {
      marginRight: 8,
    },
    '& > :last-child': {
      marginRight: 0,
    },
    '@media (max-width: 550px)': {
      'flexDirection': 'column',
      '& > *': {
        marginRight: 0,
      },
      '& > :last-child': {
        marginBottom: '8px',
      },
    },
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    display: 'inline-flex',
    borderRadius: '50%',
    padding: 4,
    cursor: 'pointer',
    transition: 'background 0.2s ease-in-out',
  },

  cancelButton: {
    '@media (max-width: 550px)': {
      minWidth: '144px',
      order: 1,
    },
  },
  okButton: {
    'minWidth': 'auto',
    'height': 40,
    'borderRadius': 8,
    'textTransform': 'none',
    '@media (max-width: 550px)': {
      order: 0,
    },

    '& .MuiButton-label': {
      fontFamily: 'Source Sans Pro',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '20px',
    },
  },
}));
