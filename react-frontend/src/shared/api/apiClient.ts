import axios from 'axios';

const authToken = localStorage.getItem('accessToken');

const axiosClient = axios.create({
  baseURL: `/`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'fds',
    ...(authToken ? { authorization: `Bearer ${authToken}` } : {}),
  },
});

export { axiosClient };
