import axios from 'axios';
import type { OauthResponse } from './types';

export const oauthLogin: OauthResponse = async (authCode = '') => {
  if (authCode !== '') {
    const res = await axios.get(`api/oauth/github/callback?code=${authCode}`);
    console.log(res);
    const user = res.data;
    return user;
  } else return null;
};
