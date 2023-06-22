import { api } from '../config/api-config';

export const getRecentPosts = async (
  channelId: string | string[] | undefined
) => {
  const { data } = await api.get(`/api/page/recently/${channelId}`);
  return data;
};
