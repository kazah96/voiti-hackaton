import MaterialButton, { ButtonProps } from '@mui/material/Button';
import { FC } from 'react';
import { useStyles } from './styles';

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  const styles = useStyles();

  return (
    <MaterialButton {...props}>
      <div className={styles.text}>{children}</div>
    </MaterialButton>
  );
};
