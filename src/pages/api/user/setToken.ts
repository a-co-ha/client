import axios from 'axios';
import { setCookie } from 'cookies-next';
import type { GetServerSidePropsContext } from 'next';

export const setToken = async (
  accessToken: string | undefined,
  context: GetServerSidePropsContext
) => {
  if (accessToken !== undefined) {
    const { req, res } = context;
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    console.log(`token!!!`, accessToken);
    setCookie('accessToken', accessToken, {
      req,
      res,
      maxAge: 60 * 60 * 24,
      httpOnly: true,
    });
  } else return null;
};
