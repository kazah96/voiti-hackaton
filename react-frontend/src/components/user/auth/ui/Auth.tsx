import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from 'shared/ui';
import { useAuthContext } from '../model/context';
import { useStyles } from './styles';

export const Auth = () => {
  const classes = useStyles();
  const { auth } = useAuthContext();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    auth.singUp(data);
  };

  return (
    <div>
      <div>Начало Auth</div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <TextField {...field} />}
        />
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
