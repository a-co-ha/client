import { api } from '../config/api-config';
export const deleteBookmark = async (channelId: string, bookmarkId: string) => {
  try {
    const res = await api.delete(
      `/api/bookmark/${bookmarkId}?channel=${channelId}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
