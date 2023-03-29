import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import { getToken } from '../user/getToken';

export const api = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
      ? process.env.NEXT_PUBLIC_ENV_URL
      : process.env.NEXT_PUBLIC_DEV_SERVER_URL
  }`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
//Authorization: `access ${accessToken}`
console.log('여기', process.env.NEXT_PUBLIC_DEV_SERVER_URL);

api.interceptors.request.use(
  (config) => {
    console.log(`인터셉터 request`);
    const accessToken = getCookie('accessToken');
    // const accessToken = getCookie('accessToken');
    if (config.headers && accessToken)
      config.headers.Authorization = `access ${accessToken}`;
    // console.log(`인터셉터 request 2`, accessToken);
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    console.log(`이거에러`, error);
    if (error.response.status === 403) {
      // deleteCookie(`refreshToken`);
      // api.defaults.headers.common['Authorization'] = `access ${accessToken}`;
      // setCookie(`accessToken`, accessToken);
      // console.log(`new accessToken`, accessToken);
    }
  }
);
