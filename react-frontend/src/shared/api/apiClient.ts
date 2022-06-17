import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export { axiosClient };
