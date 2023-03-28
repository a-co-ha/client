import { api } from '../config/api-config';
export const putEditablePage = async (
  channelId: string | string[] | undefined,
  pageId: string,
  pageName: string
) => {
  try {
    const res = await api.put(`/api/page/${pageId}?channel=${channelId}`, {
      pageName,
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
