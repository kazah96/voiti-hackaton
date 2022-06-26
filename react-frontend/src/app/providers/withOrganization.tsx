import { OrganizationProvider } from 'components/organization';

export const withOrganization = (component: () => React.ReactNode) => () => {
  return <OrganizationProvider>{component()}</OrganizationProvider>;
};
