import axios from 'axios';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';

export const api = axios.create({
  withCredentials: true,
  baseURL: `${
    process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
      ? process.env.NEXT_PUBLIC_ENV_URL
      : process.env.NEXT_PUBLIC_DEV_SERVER_URL
  }`,
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log('여기', process.env.NEXT_PUBLIC_DEV_SERVER_URL);

api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (config.headers && accessToken)
      config.headers.Authorization = `access ${accessToken}`;
    return config;
  },
  (error) => {
    if (error.request.response.status === 400) {
      toast.error(error.response.data.message);
    }
  }
);
api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(`이거에러`, error);
    const errorStatus = error.response.status;
    if (errorStatus === 403) {
      if (window) window.location.href = `/error`;
    }
    if (errorStatus === 400) {
      if (error.response.config.url.match(/invite/)) {
        toast.error(`이미 참여한 프로젝트입니다`);
        window.location.href = `/project/${error.response.data.message}`;
      }
      toast.error(error.response.data.message);
    }
    if (errorStatus === 500) {
      toast.error(error.response.data.message);
    }
  }
);
