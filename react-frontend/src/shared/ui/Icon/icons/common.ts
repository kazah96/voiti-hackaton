import { ReactComponent as Cross } from './assets/common/cross.svg';
import { ReactComponent as Organization } from './assets/common/organization.svg';
import { ReactComponent as Key } from './assets/common/key.svg';
import { ReactComponent as Delete } from './assets/common/delete.svg';

const commonIcon = {
  cross: Cross,
  organization: Organization,
  key: Key,
  delete: Delete,
};

export const common = {
  ...commonIcon,
};
