import { User } from 'components/user/auth';

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
