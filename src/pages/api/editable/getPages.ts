import axios from 'axios';
import type { GetEditablePages } from './types';

export const getEditablePages: GetEditablePages = async (channelId) => {
  const res = await axios.get(`/api/page?channel=${channelId}`);
  console.log('getPages', res.data);
  const pageList = res.data.List;
  return pageList;
};
