import { api } from '../config/api-config';
export const getEditablePage = async (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  type: string | string[] | undefined
) => {
  try {
    console.log(`여기 api`, channelId, pageId, type);
    const res = await api.get(
      `/api/page/${pageId}?type=${type}&channel=${channelId}`
    );
    console.log(`page 하나 조회입니다`, res.data);
    if (!res.data.blocks) return res.data.pages;
    const blocks = res.data.blocks;
    const newblocks = blocks.map(({ _id, ...keepAttrs }: any) => keepAttrs);
    return newblocks;
  } catch (err) {
    console.error(err);
    return null;
  }
};
