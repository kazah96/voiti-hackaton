import clsx from 'clsx';
import { User } from 'components/user/auth';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { CellProps } from 'react-table';

import { useStyles } from './styles';

export const CustomActionsCellForWorkersLogs: FC<CellProps<User>> = ({ row }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/organization/${row.original._id}`);
  }, [navigate, row.original._id]);

  return (
    <div className={clsx(classes.link, classes.actionButton)} onClick={handleClick}>
      {row.original.name}
    </div>
  );
};
