import axios from 'axios';
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
    console.log(err);
    return null;
  }
};
