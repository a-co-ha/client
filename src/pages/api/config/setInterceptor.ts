import { AxiosInstance } from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { getToken } from '../user/getToken';
import { api } from './api-config';

export const setInterceptor = () => {
  api.interceptors.request.use(
    (config) => {
      // console.log(`인터셉터 request`);
      // const accessToken = getCookie('accessToken');
      // if (config.headers && accessToken)
      //   api.defaults.headers.common['Authorization'] = `access ${accessToken}`;
      // console.log(`인터셉터 request 2`, accessToken);
      return config;
    },
    (error) => Promise.reject(error)
  );
  api.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      console.log(`이거에러`, error);
      if (error.response.data.message.message === 'refresh error') {
        console.log(error.response.data);
        // const accessToken = await getToken();
        // api.defaults.headers.common['Authorization'] = `access ${accessToken}`;
        // setCookie(`accessToken`, accessToken);
        // console.log(`new accessToken`, accessToken);
      }
    }
  );
  return api;
};
