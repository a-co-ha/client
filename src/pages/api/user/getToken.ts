import { CookieValueTypes } from 'cookies-next';
import { api } from '../config/api-config';

export const getToken = async (refreshToken: CookieValueTypes) => {
  if (refreshToken !== undefined) {
    const token = await api.get(`/api/user/refresh`, {
      headers: {
        Authorization: `refresh ${refreshToken}`,
      },
    });
    return token.data.accessToken;
  } else return null;
};
