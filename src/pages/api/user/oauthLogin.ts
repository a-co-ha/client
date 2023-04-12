import { api } from '../config/api-config';

export const oauthLogin = async (
  authCode: string | string[] | undefined = ''
) => {
  console.log('oauth입니다');
  if (authCode !== '') {
    const res = await api.get(`/api/oauth/github/callback?code=${authCode}`);
    console.log(`여기는 oauth res`, res.headers);

    const {
      token: { accessToken, refreshToken },
      user: { userId },
      sessionID,
    } = res.data;
    // let sidCookie;
    // if (res.headers['set-cookie'] !== undefined) {
    //   sidCookie = res.headers['set-cookie'][0];
    //   // console.log(`쿠키`, sidCookie);
    // }

    return { accessToken, refreshToken, userId, sessionID };
  } else return null;
};
