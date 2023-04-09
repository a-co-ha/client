import { api } from '../config/api-config';

export const oauthLogin = async (
  authCode: string | string[] | undefined = ''
) => {
  console.log('oauth입니다');
  if (authCode !== '') {
    const res = await api.get(`/api/oauth/github/callback?code=${authCode}`);
    console.log(`여기는 oauth res`, res.data);
    return res.data;
  } else return null;
};
