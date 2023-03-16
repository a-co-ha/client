import axios from 'axios';
import { setCookie } from 'cookies-next';

export const setToken = (accessToken: string) => {
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;

  setCookie('accessToken', accessToken, {
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  });
};
