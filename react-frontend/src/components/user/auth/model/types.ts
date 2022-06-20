export interface User {
  email: string;
  name: string;
  role: string[];
}

export interface AuthFormData {
  email: string;
  password: string;
}
export interface SingUpData extends AuthFormData {
  name: string;
}

export interface SingInData extends AuthFormData {}
