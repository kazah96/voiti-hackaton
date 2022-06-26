import { User } from 'components/user/auth';
import { FC, useCallback } from 'react';
import { CellProps } from 'react-table';
import { Icon } from 'shared/ui';
import { useOrganizationContext } from '../model';
import { ActionButton } from '../types';
import { useStyles } from './styles';

export const CustomActionsCell: FC<CellProps<User>> = ({ row }) => {
  const classes = useStyles();
  const {
    organization: { generateKeyByToken, deleteWorker },
  } = useOrganizationContext();

  console.log(row);

  const handleAction = useCallback(
    (key) => {
      switch (key) {
        case 'generate':
          return generateKeyByToken(row.original.email);
        case 'delete':
          return deleteWorker(row.original._id);
        default:
          break;
      }
    },
    [deleteWorker, generateKeyByToken, row.original._id, row.original.email]
  );

  const actionButtons: ActionButton[] = [
    {
      key: 'generate',
      icon: 'key',
    },
    {
      key: 'delete',
      icon: 'delete',
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
