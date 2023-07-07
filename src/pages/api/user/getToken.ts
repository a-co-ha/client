import { CookieValueTypes } from 'cookies-next';
import { api } from '../config/api-config';

export const getToken = async (refreshToken: CookieValueTypes) => {
  console.log('리프레쉬', refreshToken);
  if (refreshToken !== undefined) {
    const token = await api.get(`/api/user/refresh`, {
      headers: {
        Authorization: `refresh ${refreshToken}`,
      },
    });
    console.log(`토큰토큰`, token.data.accessToken);
    return token.data.accessToken;
  } else return null;
};
