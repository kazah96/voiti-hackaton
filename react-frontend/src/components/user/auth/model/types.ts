export interface User {
  email: string;
  name: string;
  roles: string[];
  isAdmin: boolean;
  organization: string[];
}

export interface AuthFormData {
  email: string;
  password: string;
}
export interface SingUpData extends AuthFormData {
  name: string;
}

export interface SingInData extends AuthFormData {}

export interface ResponseData<T> {
  data: T;
}
export interface SingInDTO {
  access_token: string;
  user: User;
}
