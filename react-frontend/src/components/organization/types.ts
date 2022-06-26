import { User } from 'components/user/auth';
import { IconNamesType } from 'shared/ui/Icon/types';

export interface OrganizationUsersDTO {
  admins: User[];
  name: string;
  workers: User[];
}

export interface SendDataForm {
  name: string;
  email: string;
  password: string;
  organization: string[];
}

export interface ActionButton {
  key: string;
  icon: IconNamesType;
}
