import axios from 'axios';
import { setCookie, getCookie } from 'cookies-next';
import type { GetServerSidePropsContext } from 'next';

export const setToken = async (
  accessToken: string,
  context?: GetServerSidePropsContext
) => {
  console.log('httpOnly', process.env.NEXT_PUBLIC_HTTP_ONLY);
  if (accessToken !== undefined && context !== undefined) {
    const { req, res } = context;
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    console.log(`client save token!!!`, accessToken);
    setCookie('accessToken', accessToken, {
      req,
      res,
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: 'lax',
    });
  } else return null;
};
