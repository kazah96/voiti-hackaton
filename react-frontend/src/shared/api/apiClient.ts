import axios from 'axios';

const authToken = localStorage.getItem('accessToken');

const axiosClient = axios.create({
  baseURL: `/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(authToken ? { authorization: authToken } : {}),
  },
});

export { axiosClient };
