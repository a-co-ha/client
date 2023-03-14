import { api } from '@/api/api-config';

export const getChannelUsers = () => {
  return api.get('/channel/users').then((data) => data.data.user);
};
