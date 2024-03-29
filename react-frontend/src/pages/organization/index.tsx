import { Header } from 'components/header';
import { Organization, useOrganizationContext } from 'components/organization';
import { observer } from 'mobx-react';
import { useStyles } from './styles';

export const OrganizationPage = observer(() => {
  const classes = useStyles();
  const {
    organization: { organizationName },
  } = useOrganizationContext();

  return (
    <div>
      <div className={classes.menu}>
        <Header title={`Организация ${organizationName}`} />
      </div>
      <Organization />
    </div>
  );
});
