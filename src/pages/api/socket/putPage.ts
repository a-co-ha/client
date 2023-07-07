import { api } from '../config/api-config';
export const putSocketPage = async (
  channelId: string | string[] | undefined,
  pageId: string,
  pageName: string
) => {
  try {
    const res = await api.put(`/api/page/room/${pageId}?channel=${channelId}`, {
      pageName,
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
