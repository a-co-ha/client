import { api } from '../config/api-config';

export const getUser = async () => {
  const res = await api.get(`/api/user`);
  return res.data;
};
