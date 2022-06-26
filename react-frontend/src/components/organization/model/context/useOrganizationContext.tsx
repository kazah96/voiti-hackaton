import { useContext } from 'react';

import { OrganizationContext } from './OrganizationProvider';

export const useOrganizationContext = () => {
  return useContext(OrganizationContext);
};
