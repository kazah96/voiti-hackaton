import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `/`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'fds',
  },
});

export { axiosClient };
