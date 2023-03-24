import { api } from '../config/api-config';

export const getChannelUsers = () => {
  return api.get('/channel/users').then((data) => data.data.user);
};