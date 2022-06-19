import { action, observable } from 'mobx';
import { axiosClient } from 'shared/api/apiClient';

export class CatListStore {
  @observable cats = [];

  @action
  getCats() {
    return axiosClient.get('/cats');
  }
}
