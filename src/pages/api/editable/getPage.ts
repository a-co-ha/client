import axios from 'axios';
import type { GetEditablePage } from './types';

export const getEditablePage: GetEditablePage = async (channelId, pageId) => {
  const res = await axios.get(
    `http://localhost:3000/api/post/${pageId}?channel=${channelId}`
  );
  const fetchedBlocks = res.data.page.blocks;
  return fetchedBlocks;
};
