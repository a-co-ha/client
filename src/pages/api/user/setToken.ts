import { setCookie, getCookies } from 'cookies-next';
import type { GetServerSidePropsContext } from 'next';

export const setToken = async (
  accessToken: string,
  refreshToken: string,
  sessionId: string
  // context: GetServerSidePropsContext
) => {
  if (accessToken !== undefined && refreshToken !== undefined) {
    // const { req, res } = context;
    setCookie('accessToken', accessToken, {
      maxAge: 60 * 6 * 24,
      sameSite: 'lax',
    });
    setCookie('refreshToken', refreshToken, {
      maxAge: 60 * 6 * 24,
      sameSite: 'lax',
    });
    setCookie('sessionId', sessionId, {
      maxAge: 60 * 6 * 24,
      sameSite: 'lax',
    });
    const cookies = getCookies();
    return cookies;
  } else return null;
};
