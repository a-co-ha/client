import { api } from '../config/api-config';

export const getBookmarks = async (channelId: string) => {
  const res = await api.get(`/api/bookmarkList?channel=${channelId}`);
  console.log(`북마크`, res.data);
  return res.data.bookmarkList;
};
