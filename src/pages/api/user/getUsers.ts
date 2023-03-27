import { api } from '../config/api-config';

export const getUsers = () => {
  return api.get('/channel/users').then((data) => data.data.user);
};
