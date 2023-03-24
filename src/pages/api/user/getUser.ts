import { api } from '../config/api-config';
import { getCookie } from 'cookies-next';

export const getUser = async () => {
  const res = await api.get(`/api/user`);
  return res.data;
};
