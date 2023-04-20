import { api } from '../config/api-config';

export const getBookmarks = async (
  channelId: string | string[] | undefined
) => {
  const res = await api.get(`/api/bookmarkList?channel=${channelId}`);
  console.log(res.data);
  return res.data;
};
