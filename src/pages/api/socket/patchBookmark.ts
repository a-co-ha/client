import { api } from '../config/api-config';
export const patchBookmark = async (
  channelId: string,
  bookmarkId: string,
  bookmarkName: string,
  content: string
) => {
  try {
    const res = await api.patch(
      `/api/bookmark/${bookmarkId}?channel=${channelId}`,
      {
        bookmarkName,
        content,
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
