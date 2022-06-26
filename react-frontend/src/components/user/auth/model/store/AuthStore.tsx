import { action, computed, makeObservable, observable } from 'mobx';
import { axiosClient } from 'shared/api/apiClient';
import type { ResponseData, SingInData, SingInDTO, SingUpData, User } from '../types';

export class AuthStore {
  constructor() {
    makeObservable(this);
  }

  @observable user: User = null;
  @observable accessToken: string = null;

  @computed
  get isOrganization() {
    return this.user?.organizations?.length > 0;
  }

  @action
  singUp = (data: SingUpData) => {
    axiosClient.post('/auth/register', data).then(() => {
      this.singIn({ email: data.email, password: data.password });
    });
  };

  @action
  getUser = () => {
    axiosClient.get('/users/me').then((response: ResponseData<User>) => {
      this.user = response.data;
    });
  };

  @action
  singIn = (data: SingInData) => {
    return axiosClient.post('/auth/login', data).then((response: ResponseData<SingInDTO>) => {
      this.accessToken = response.data.access_token;
      localStorage.setItem('accessToken', response.data.access_token);
      this.user = response.data.user;
    });
  };
}
