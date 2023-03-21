import { api } from '../config/api-config';
export const getEditablePage = async (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  type: string | string[] | undefined
) => {
  try {
    console.log(`여기 api`, channelId, pageId, type);
    const res = await api.get(
      `/api/page/${pageId}?channel=${channelId}&type=${type}`
    );
    return res.data.blocks;
  } catch (err) {
    console.error(err);
    return null;
  }
};
