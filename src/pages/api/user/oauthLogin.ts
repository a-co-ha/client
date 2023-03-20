import { api } from '../config/api-config';
import { setToken } from './setToken';
import { GetServerSidePropsContext } from 'next';

export const oauthLogin = async (
  authCode: string | string[] | undefined = '',
  context: GetServerSidePropsContext
) => {
  if (authCode !== '') {
    const res = await api.get(`/api/oauth/github/callback?code=${authCode}`);
    const authToken = res.data.token.accessToken;
    await setToken(authToken, context);
    return res.data;
  } else return null;
};
