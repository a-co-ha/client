import { api } from '../config/api-config';
import { nanoId } from '@/utils/nanoId';

export const postEditablePage = async (
  channelId: string | string[] | undefined
) => {
  const res = await api.post(`/api/page?channel=${channelId}`, {
    blockId: nanoId(),
  });
  console.log(`여기는 포스트 에디터블`, res.data);
  return res.data;
};
