import axios from 'axios';
import type { OauthResponse } from './types';

export const oauthLogin: OauthResponse = async (authCode = '') => {
  if (authCode !== '') {
    const res = await axios.post(`/oauth/callback?code=${authCode}`, {
      name: '',
    });
    console.log(res);
    const user = res.data.user;
    return user;
  } else return null;
};
