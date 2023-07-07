import { api } from '../config/api-config';

export const getUser = async () => {
  const res = await api.get(`/api/user`);
  console.log(`dadada`, res.data);
  return res.data;
};
