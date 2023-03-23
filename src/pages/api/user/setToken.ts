import axios from 'axios';
import { setCookie } from 'cookies-next';

export const setToken = async (accessToken: string | undefined) => {
  console.log('httpOnly', process.env.NEXT_PUBLIC_HTTP_ONLY);

  if (accessToken !== undefined) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    console.log(`client save token!!!`, accessToken);
    if (process.env.NEXT_PUBLIC_HTTP_ONLY === 'true') {
      setCookie('accessToken', accessToken, {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
      });
    } else {
      setCookie('accessToken', accessToken, {
        maxAge: 60 * 60 * 24,
      });
    }
  } else return null;
};
