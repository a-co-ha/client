import { api } from '../config/api-config';

export const oauthLogin = async (
  authCode: string | string[] | undefined = ''
) => {
  ('oauth입니다');
  if (authCode !== '') {
    const res = await api.get(`/api/oauth/github/callback?code=${authCode}`, {
      headers: {
        Origin: `${process.env.NEXT_PUBLIC_ORIGIN}`,
      },
    });

    const {
      token: { accessToken, refreshToken },
      user: { userId, name },
      sessionID,
    } = res.data;

    return { accessToken, refreshToken, userId, name, sessionID };
  } else return null;
};
