import { makeStyles } from 'shared/theme';

export const useStyles = makeStyles(() => ({
  root: {
    'borderRadius': 8,
    'border': '1px solid rgba(63, 54, 54, 0.1)',
    'background': '#F8F8F8',
    'height': 40,

    'label + &': {
      marginTop: 3,
    },
  },
  rootDark: {
    border: '1px solid #323232',
    background: 'rgba(30, 29, 29, 0.9)',
  },
  rootHelper: {
    marginBottom: 4,
    marginLeft: 0,
    fontSize: 12,
    color: 'red',
  },

  error: {
    border: '1px solid #F18E95',
  },
  errorDark: {
    border: '1px solid #4F2121',
  },

  focused: {
    background: '#fff',
    boxShadow: `0px 0px 0px 3px #000`,
  },
  focusedDark: {
    background: '#252525',
    boxShadow: '0px 0px 0px 3px #222F3F',
  },

  input: {
    'position': 'relative',
    'padding': '8px 16px',
    'fontSize': '1rem',
    'fontWeight': 'normal',
    'letterSpacing': '0.01em',
    'color': '#1C1919',

    '&::placeholder': {
      fontStyle: 'italic',
      color: 'rgba(63, 54, 54, 0.5)',
    },
  },
  inputDark: {
    'color': '#FFF',
    'caret-color': '#599FF1',

    '&::placeholder': {
      fontStyle: 'italic',
      color: '#404040',
    },
  },

  notchedOutline: {
    borderWidth: '0 !important',
  },

  multiline: {
    padding: 0,
  },

  adornedStart: {
    'paddingLeft': 8,
    '& input': {
      paddingLeft: 8,
    },
  },
  adornedEnd: {
    'paddingRight': 8,
    '& input': {
      paddingRight: 8,
    },
  },

  tooltipIcon: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
}));
