import axios from 'axios';
import { nanoId } from '@/utils/nanoId';

export const postEditablePage = async (
  channelId: string | string[] | undefined
) => {
  const res = await axios.post(
    `http://localhost:3000/api/post?channel=${channelId}`,
    {
      blockId: nanoId(),
    }
  );
  return [res.data._id, res.data.type];
};
