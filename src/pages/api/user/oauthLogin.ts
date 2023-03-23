import { api } from '../config/api-config';
import { setToken } from './setToken';

export const oauthLogin = async (
  authCode: string | string[] | undefined = ''
) => {
  if (authCode !== '') {
    const res = await api.get(`/api/oauth/github/callback?code=${authCode}`);
    const authToken = res.data.token.accessToken;
    await setToken(authToken);
    return res.data;
  } else return null;
};
