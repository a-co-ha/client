import axios from 'axios';
import type { GetEditablePage } from './types';

export const getEditablePage: GetEditablePage = async (channelId, pageId) => {
  const res = await axios.get(`/api/page/${pageId}?channel=${channelId}`);
  console.log('getPage', res.data);
  const fetchedBlocks = res.data.blocks;
  return fetchedBlocks;
};
