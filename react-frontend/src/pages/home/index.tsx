import { Header } from 'components/header';
import { useAuthContext } from 'components/user/auth';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from 'shared/ui';
import { IconNamesType } from 'shared/ui/Icon/types';

import { useStyles } from './styles';

const menu: { icon: IconNamesType; name: string; link: string }[] = [
  {
    icon: 'rrom',
    name: 'Личный кабинет',
    link: 'profile',
  },
  {
    icon: 'organization',
    name: 'Организация',
    link: 'organization',
  },
  {
    icon: 'logi',
    name: 'Логирование',
    link: 'logs',
  },
  {
    icon: 'devices',
    name: 'Устройства',
    link: 'devices',
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
              <Icon className={classes.icon} name={item.icon} />
            </div>

            <div className={classes.name}>{item.name}</div>
          </div>
        );
      }),
    [classes.block, classes.name, handleLink]
  );

  return (
    <div>
      <Header />
      <div className={classes.title}>Добро пожаловать в систему мониторинга</div>
      <div className={classes.menu}>{renderMenu}</div>
    </div>
  );
};
