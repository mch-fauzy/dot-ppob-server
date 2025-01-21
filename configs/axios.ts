import axios from 'axios';
import {CONFIG} from './config';

const axiosInstance = axios.create({
  baseURL: CONFIG.AXIOS.URL,
  timeout: Number(CONFIG.AXIOS.TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
  },
});

export {axiosInstance};
