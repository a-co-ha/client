import { api } from '../config/api-config';
export const getEditablePage = async (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  type: string | string[] | undefined
) => {
  try {
    console.log(`여기 api`, channelId, pageId, type);
    const res = await api.get(
      `/api/page/641ebf9a9cd1f46e9bea0120?type=normal&channel=113`
    );
    console.log(`page 하나 조회입니다`, res.data);
    return res.data.blocks;
  } catch (err) {
    console.error(err);
    return null;
  }
};
