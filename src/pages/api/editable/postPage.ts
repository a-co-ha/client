import axios from 'axios';
import { nanoId } from '@/utils/nanoId';

export const postEditablePage = async (
  channelId: string | string[] | undefined
) => {
  const res = await axios.post(`/api/page?channel=${channelId}`, {
    blockId: nanoId(),
  });
  console.log('postPage', res.data);
  return [res.data._id, res.data.type];
};
