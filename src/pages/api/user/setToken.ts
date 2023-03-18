import axios from 'axios';
import { setCookie } from 'cookies-next';

export const setToken = async (accessToken: string | undefined) => {
  if (accessToken !== undefined) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    console.log(`token!!!`, accessToken);
    setCookie('accessToken', accessToken, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
    });
  } else return null;
};
