import { axiosClient } from '../apiClient';

export function getUser() {
  return axiosClient.get('/user');
}

export function getCats() {
  return axiosClient.get('/cats');
}

export function getFromPython() {
  return axiosClient.get('/fastapi/eaq');
}

export function uploadFile(file) {
  // const formData = new FormData();
  // formData.append('in_file', file);
  // return axiosClient.post('/fastapi/guess_number', formData);
}

export function tryGuess(file) {
  const formData = new FormData();

  formData.append('in_file', file);

  return axiosClient.post('/fastapi/guess_number', formData);
}
