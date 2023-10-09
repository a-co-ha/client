import { api } from '../config/api-config';
import { nanoId } from '@/utils/nanoId';

export const postEditablePage = async (
  channelId: string | string[] | undefined
) => {
  const res = await api.post(`/api/page?channel=${channelId}`, {
    blockId: nanoId(),
  });
  return res.data;
};
