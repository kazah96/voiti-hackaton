import { Header } from 'components/header';
import { useAuthContext } from 'components/user/auth';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Icon, IconNamesType } from 'shared/ui';

import { useStyles } from './styles';

const menu: { icon: IconNamesType; name: string; link: string }[] = [
  {
    icon: 'organization',
    name: 'Личный кабинет',
    link: 'profile',
  },
  {
    icon: 'organization',
    name: 'Организация',
    link: 'organization',
  },
  {
    icon: 'organization',
    name: 'Логирование',
    link: 'logs',
  },
  {
    icon: 'organization',
    name: 'Выход',
    link: 'logout',
  },
];

export const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    auth: { logout },
  } = useAuthContext();

  const handleLink = useCallback(
    (link) => () => {
      if (link === 'logout') {
        logout();
        return (window.location.href = '/');
      }

      return navigate(`/${link}`);
    },
    [logout, navigate]
  );

  const renderMenu = useMemo(
    () =>
      menu.map((item) => {
        return (
          <div onClick={handleLink(item.link)} className={classes.block} key={item.link}>
            <div>
              <Icon name={item.icon} />
            </div>

            <div className={classes.name}>{item.name}</div>
          </div>
        );
      }),
    []
  );

  return (
    <div>
      <Header />
      <div className={classes.title}>Добро пожаловать в систему мониторинга</div>
      <div className={classes.menu}>{renderMenu}</div>
    </div>
  );
};
