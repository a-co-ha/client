import axios from 'axios';
import type { GetEditablePages } from './types';

export const getEditablePages: GetEditablePages = async (channelId) => {
  const res = await axios.get(
    `http://localhost:3000/api/pages?channel=${channelId}`
  );
  const pageList = res.data.pageList;
  return pageList;
};
