import { setCookie, getCookies } from 'cookies-next';
import type { GetServerSidePropsContext } from 'next';

export const setToken = async (
  accessToken: string,
  refreshToken: string,
  context: GetServerSidePropsContext
) => {
  console.log('httpOnly', process.env.NEXT_PUBLIC_HTTP_ONLY);
  if (accessToken !== undefined && refreshToken !== undefined) {
    const { req, res } = context;
    setCookie('accessToken', accessToken, {
      req,
      res,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax',
    });
    setCookie('refreshToken', refreshToken, {
      req,
      res,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax',
    });
    const cookies = getCookies({ req, res });
    return cookies;
  } else return null;
};
