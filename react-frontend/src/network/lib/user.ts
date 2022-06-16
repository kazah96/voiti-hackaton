import { axiosClient } from '../apiClient';

export function getUser() {
  return axiosClient.get('/user');
}

export function getCats() {
  return axiosClient.get('/cats');
}
