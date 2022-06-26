import axios from 'axios';

const ax = axios.create({
  baseURL: 'http://192.168.0.108:3001',
  headers: {'Content-Type': 'application/json'},
});

export {ax};
