import { api } from '../config/api-config';

export const getBookmarks = async (roomId: string) => {
  const res = await api.get(`/api/bookmarks/${roomId}`);
  return res.data;
};
