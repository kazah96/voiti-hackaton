import { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button, TextField } from 'shared/ui';
import { useAuthContext } from '../model/context';
import { useStyles } from './styles';
import { AuthProps } from './types';

export const Auth: FC<AuthProps> = ({ isLogin = false }) => {
  const [message, setMessage] = useState<{ status: 'error' | 'ok'; text: string }>(null);
  const classes = useStyles();
  const { auth } = useAuthContext();
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const singIn = (data) => {
    auth.singIn(data).then(() => {
      navigate('/');
    });
  };

  const onSubmit = async (data) => {
    let result;
    if (isLogin) {
      result = await singIn(data);

      return setMessage(result);
    }

    result = await auth.singUp(data);
    if (result.status === 'ok') {
      navigate('/login');
    }

    return setMessage(result);
  };

  const handleRedirect = () => {
    navigate(isLogin ? '/registration' : '/login');
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>{isLogin ? 'Войти в хату' : 'Представиться'}</div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        {!isLogin && (
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} placeholder="Name" />}
          />
        )}
        <Controller
          name="email"
          control={control}
          render={({ field }) => <TextField {...field} placeholder="Email" />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <TextField {...field} placeholder="Password" type="password" />}
        />

        <Button type="submit" color="primary" variant="contained">
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </Button>
        <Button
          onClick={handleRedirect}
          className={classes.button}
          color="primary"
          variant="outlined"
        >
          {isLogin ? 'Зарегистрироваться' : 'Войти'}
        </Button>
        {message && (
          <p
            className={message.status === 'error' ? classes.descriptionError : classes.description}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};
