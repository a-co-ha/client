import { api } from '../config/api-config';
export const deleteEditablePage = async (
  channelId: string | string[] | undefined,
  pageId: string,
  type: string | string[] | undefined
) => {
  try {
    const res = await api.delete(
      `/api/list/${pageId}?channel=${channelId}&type=${type}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
