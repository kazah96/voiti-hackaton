import { ActionButton } from 'components/organization/types';
import { useCallback } from 'react';
import { Icon } from 'shared/ui';
import { useDevicesContext } from '../model';
import { useStyles } from './styles';

export const CustomActionsCell = ({ row }) => {
  const classes = useStyles();
  const {
    devices: { activateDevice },
  } = useDevicesContext();

  console.log(row);

  const handleAction = useCallback(
    (key) => {
      switch (key) {
        case 'activate':
          return activateDevice(row.original.code);

        default:
          break;
      }
    },
    [activateDevice, row.original.code]
  );

  const actionButtons: ActionButton[] = [
    {
      key: 'activate',
      icon: 'check-mark',
    },
  ];

  return (
    <div>
      {actionButtons.map((button) => {
        return (
          <span
            key={button.key}
            className={classes.actionButton}
            onClick={() => handleAction(button.key)}
          >
            <Icon name={button.icon} />
          </span>
        );
      })}
    </div>
  );
};
