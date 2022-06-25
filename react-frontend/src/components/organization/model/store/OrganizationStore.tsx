import { OrganizationUsersDTO } from 'components/organization/types';
import { ResponseData } from 'components/user/auth';
import { action, observable } from 'mobx';
import { axiosClient } from 'shared/api/apiClient';
import { OrganizationUsersMap } from '../utils/mappers';

export class OrganizationStore {
  @observable organizationUsers = [];

  @action
  createOrganization = (data) => {
    return axiosClient.post('/organization/add', data);
  };

  @action
  getOrganizationUsers = (organizationId) => {
    return axiosClient
      .get(`/users?organizationID=${organizationId}`)
      .then((response: ResponseData<OrganizationUsersDTO>) => {
        this.organizationUsers = OrganizationUsersMap(response.data.users);
      });
  };
}
