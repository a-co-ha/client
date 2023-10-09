import { api } from '../config/api-config';

export const postBookmark = async (
  channelId: string,
  bookmarkName: string,
  content: string
) => {
  const res = await api.post(`/api/bookmark?channel=${channelId}`, {
    bookmarkName,
    content,
  });
  return res.data;
};
