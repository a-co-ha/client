import { api } from '../config/api-config';

export const getUsers = (channelId: string | string[] | undefined) => {
  return api
    .get(`/api/channel/users?channel=${channelId}`)
    .then((data) => data.data);
};
