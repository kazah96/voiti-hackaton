import { makeStyles } from 'shared/theme';

export default makeStyles(() => ({
  container: {
    overflow: 'auto',
  },
  table: {
    'width': '100%',
    'borderSpacing': 0,
    'borderCollapse': 'collapse',

    '& tr': {
      '&:last-child': {
        '& td': {
          borderBottom: 0,
        },
      },
    },

    '& th, & td': {
      'display': 'inline-flex',
      'alignItems': 'center',
      'margin': 0,

      /* The secret sauce */
      /* Each cell should grow equally */
      'width': '1%',
      /* But "collapsed" cells should be as small as possible */
      '&.collapse': {
        width: '0.0000000001%',
      },

      '&:last-child': {
        borderRight: 0,
      },
    },
    '& th': {
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '150%',
      letterSpacing: '0.01em',
      color: '#ccc',
    },
  },
  tableHeader: {
    '& tr': {
      padding: '16px 0',
      paddingLeft: 32,
    },
  },
  tableBody: {
    'display': 'block',
    'border': `1px solid #ccc`,
    'borderRadius': 8,
    'backgroundColor': '#fff',
    'paddingLeft': 32,

    '& tr': {
      'padding': '16px 0',
      'borderBottom': `1px solid #ccc`,

      '&:last-child': {
        border: 0,
      },
    },
  },
  resizer: {
    'right': -5,
    'width': 10,
    'height': '100%',
    'position': 'absolute',
    'top': 0,
    'zIndex': 1,
    'touchAction': 'none',

    '&.isResizing': {},
  },
}));
