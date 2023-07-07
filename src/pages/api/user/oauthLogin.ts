import { api } from '../config/api-config';

export const oauthLogin = async (
  authCode: string | string[] | undefined = ''
) => {
  console.log('oauth입니다');
  if (authCode !== '') {
    const res = await api.get(`/api/oauth/github/callback?code=${authCode}`, {
      headers: {
        Origin: `${process.env.NEXT_PUBLIC_ORIGIN}`,
      },
    });
    console.log(`여기는 oauth res`, res.data);

    const {
      token: { accessToken, refreshToken },
      user: { userId, name },
      sessionID,
    } = res.data;

    return { accessToken, refreshToken, userId, name, sessionID };
  } else return null;
};
