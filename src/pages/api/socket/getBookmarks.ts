import { api } from '../config/api-config';

export const getBookmarks = async (roomId: string) => {
  const res = await api.get(`/api/bookmarks/${roomId}`);
  console.log(`북마크`, res.data.bookmarkList); // []
  return res.data;
};
