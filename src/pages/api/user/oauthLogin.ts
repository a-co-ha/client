import { api } from '../config/api-config';
import { setToken } from './setToken';
import type { GetServerSidePropsContext } from 'next';

export const oauthLogin = async (
  authCode: string | string[] | undefined = '',
  context?: GetServerSidePropsContext
) => {
  console.log('oauth입니다');
  if (authCode !== '') {
    const res = await api.get(`/api/oauth/github/callback?code=${authCode}`);
    console.log(`여기는 oauth res`, res);
    const authToken = res.data.token.accessToken;
    // const token = await setToken(authToken, context);
    // console.log(`token여기입니다`, token);
    return authToken;
  } else return null;
};
