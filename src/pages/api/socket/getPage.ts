import axios from 'axios';
import type { GetSocketPage } from './types';

export const getSocketPage: GetSocketPage = async (channelId, pageId) => {
  const res = await axios.get(
    `http://localhost:3000/api/get/socket?page=${pageId}?channel=${channelId}`
  );
  return res.data;
};
