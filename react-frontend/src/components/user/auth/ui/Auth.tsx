import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from 'shared/ui';
import { useAuthContext } from '../model/context';
import { useStyles } from './styles';
import { AuthProps } from './types';

export const Auth: FC<AuthProps> = ({ isLogin = false }) => {
  const classes = useStyles();
  const { auth } = useAuthContext();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    return isLogin ? auth.singIn(data) : auth.singUp(data);
  };

  return (
    <div>
      <div>Начало Auth</div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        {!isLogin && (
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} />}
          />
        )}
        <Controller
          name="email"
          control={control}
          render={({ field }) => <TextField {...field} />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <TextField {...field} />}
        />

        <Button type="submit">Зарегаться</Button>
      </form>
    </div>
  );
};
