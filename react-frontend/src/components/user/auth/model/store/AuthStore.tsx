import { action, computed, observable } from 'mobx';
import { axiosClient } from 'shared/api/apiClient';
import type { ResponseData, SingInData, SingInDTO, SingUpData, User } from '../types';

export class AuthStore {
  @observable user: User = null;
  @observable accessToken: string = null;

  @computed
  get isOrganization() {
    return this.user?.organization?.length > 0;
  }

  @action
  singUp = (data: SingUpData) => {
    axiosClient.post('/auth/register', data).then((response) => {
      console.log(response);
    });
  };

  @action
  singIn = (data: SingInData) => {
    return axiosClient.post('/auth/login', data).then((response: ResponseData<SingInDTO>) => {
      this.accessToken = response.data.access_token;
      localStorage.setItem('accessToken', response.data.access_token);
      this.user = response.data.user;
      console.log(response);
    });
  };
}
