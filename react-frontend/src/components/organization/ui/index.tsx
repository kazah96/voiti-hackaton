import { useAuthContext } from 'components/user/auth';
import { Button } from 'shared/ui';
import { useStyles } from './styles';
import { UsersOrganization } from './UsersOrganization';

export const Organization = () => {
  const classes = useStyles();
  const {
    auth: { isOrganization },
  } = useAuthContext();

  const addOrganization = () => {
    return (
      <div className={classes.addOrg}>
        <div className={classes.addTitle}>У вас пока нет организации</div>
        <Button color="primary" variant="contained">
          Добавить организацию
        </Button>
      </div>
    );
  };

  return <div>{isOrganization ? <UsersOrganization /> : addOrganization()}</div>;
};
