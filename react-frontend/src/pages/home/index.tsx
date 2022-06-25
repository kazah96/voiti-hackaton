import { Header } from 'components/header';
import { useCallback } from 'react';
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
    link: 'out',
  },
];

export const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLink = useCallback((link) => () => navigate(`/${link}`), [navigate]);

  return (
    <div>
      <Header />
      <div className={classes.title}>Добро пожаловать в систему мониторинга</div>
      <div className={classes.menu}>
        {menu.map((item) => {
          return (
            <div onClick={handleLink(item.link)} className={classes.block}>
              <div>
                <Icon name={item.icon} />
              </div>

              <div className={classes.name}>{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
