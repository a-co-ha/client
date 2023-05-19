import { api } from '../config/api-config';
export const deleteEditablePage = async (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  type: string | string[] | undefined
) => {
  try {
    const res = await api.delete(
      `/api/list/${pageId}?channel=${channelId}&type=${type}`
    );
    console.log(`에디터블삭제`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
