import { Header } from 'components/header';
import { Organization, OrganizationProvider } from 'components/organization';
import { observer } from 'mobx-react';
import { useStyles } from './styles';

export const OrganizationPage = observer(() => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.menu}>
        <Header />
      </div>
      <OrganizationProvider>
        <Organization />
      </OrganizationProvider>
    </div>
  );
});
