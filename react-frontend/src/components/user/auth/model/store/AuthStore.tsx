import { action, observable } from 'mobx';
import { axiosClient } from 'shared/api/apiClient';
import type { SingInData, SingUpData, User } from '../types';

export class AuthStore {
  @observable user: User = null;

  @action
  singUp = (data: SingUpData) => {
    axiosClient.post('/auth/register', data).then((response) => {
      const { email, name, role } = response.data;
      this.user = { email, name, role };
    });
  };

  @action
  singIn = (data: SingInData) => {
    return axiosClient.post('/auth/login', data).then((response) => {
      localStorage.setItem('accessToken', response.data.access_token);
    });
  };
}
