import { OrganizationUsersDTO } from 'components/organization/types';
import { ResponseData } from 'components/user/auth';
import { action, makeObservable, observable } from 'mobx';
import { axiosClient } from 'shared/api/apiClient';
import { OrganizationUsersMap } from '../utils/mappers';

export class OrganizationStore {
  constructor() {
    makeObservable(this);
  }

  @observable organizationWorkers = [];
  @observable organizationAdmins = [];
  @observable organizationName: string = '';

  @action
  createOrganization = (data) => {
    return axiosClient.post('/organization/add', data);
  };

  @action
  getOrganizationUsers = (organizationId) => {
    return axiosClient
      .get(`/organization?id=${organizationId}`)
      .then((response: ResponseData<OrganizationUsersDTO>) => {
        this.organizationWorkers = OrganizationUsersMap(response.data.workers);
        this.organizationAdmins = OrganizationUsersMap(response.data.workers);
        this.organizationName = response.data.name;
      });
  };

  @action
  addWorker = (data) => {
    return axiosClient.post('workers/add', data).then((response) => {
      debugger;
    });
  };

  @action
  generateKeyByToken = (email: string) => {
    const data = {
      workerEmail: email,
    };

    axiosClient.post('/workers/generate_key_for_token', data).then((response) => {
      debugger;
    });
  };
}
