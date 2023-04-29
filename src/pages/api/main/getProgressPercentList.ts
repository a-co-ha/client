import { api } from '../config/api-config';

export const getProgressPercentList = async (channelId: string) => {
  return await api
    .get(`/api/template/percentage/group/${channelId}`)
    .then((res) => res.data);
};
