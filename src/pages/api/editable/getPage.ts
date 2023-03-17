import axios from 'axios';
import { toast } from 'react-toastify';
import type { GetEditablePage } from './types';

export const getEditablePage: GetEditablePage = async (
  channelId,
  pageId,
  type
) => {
  try {
    console.log(`여기 api`, channelId, pageId, type);
    const res = await axios.get(
      `/api/page/${pageId}?channel=${channelId}&type=${type}`
    );
    console.log('getPage', res.data);
    const fetchedBlocks = res.data.blocks;
    return fetchedBlocks;
  } catch (err) {
    toast.error(`예기치못한 에러가 발생했어요!`);
    console.log(err);
    return null;
  }
};
