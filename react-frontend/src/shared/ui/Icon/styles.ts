import { makeStyles } from 'shared/theme';

export default makeStyles(() => ({
  icon: {
    'width': '1em',
    'height': '1em',
    'display': 'inline-block',
    'fontSize': '1.5rem',
    'transition': 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    'flexShrink': 0,

    '&.fill': {
      fill: 'currentColor',
    },

    '&.pointer': {
      cursor: 'pointer',
    },
  },
}));
