import { action, observable } from 'mobx';
import { axiosClient } from 'shared/api/apiClient';

export class AuthStore {
  @observable user = {};

  @action
  singUp = (data) => {
    axiosClient.post('/auth/register', data).then((response) => {
      debugger;
      console.log(response);
    });
  };
}
