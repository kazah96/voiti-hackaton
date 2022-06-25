import { Header } from 'components/header';
import { Organization } from 'components/organization';
import { useStyles } from './styles';

export const OrganizationPage = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.menu}>
        <Header />
      </div>

      <Organization />
    </div>
  );
};
