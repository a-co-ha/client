import axios from 'axios';
import type { GetSocketPage } from './type';

export const getSocketPage: GetSocketPage = async (channelId, pageId) => {
  const res = await axios.get(
    `/api/get/socket?page=${pageId}?channel=${channelId}`
  );
  return res.data;
};
