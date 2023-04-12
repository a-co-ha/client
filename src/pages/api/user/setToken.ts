import { setCookie, getCookies } from 'cookies-next';

export const setToken = async (
  accessToken: string,
  refreshToken: string,
  sessionID: string,
  userId: number,
  sidCookie: string
) => {
  if (
    accessToken !== undefined &&
    refreshToken !== undefined
    // sidCookie !== undefined
  ) {
    // console.log(`sidcookie`, sidCookie);
    // const { req, res } = context;
    setCookie('accessToken', accessToken, {
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    });
    setCookie('refreshToken', refreshToken, {
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    });
    setCookie('sessionId', sessionID, {
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    });
    setCookie('myUserId', userId, {
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    });
    setCookie('sidCookie', sidCookie, {
      maxAge: 60 * 60 * 24,
      sameSite: 'none',
      secure: true,
    });
    const cookies = getCookies();
    return cookies;
  } else return null;
};
