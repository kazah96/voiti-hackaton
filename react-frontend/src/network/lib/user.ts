import { axiosClient } from '../apiClient';

export function getUser() {
  return axiosClient.get('/user');
}

export function getEee() {
  return axiosClient.get('/huita');
}
