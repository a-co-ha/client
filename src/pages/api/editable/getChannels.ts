import axios from 'axios';
import type { GetChannels } from './types';

export const getChannels: GetChannels = async (channelId) => {
  const res = await axios.get(
    `http://localhost:3000/api/channel?channel=${channelId}`
  );
  const channelList = res.data.channelList;
  return channelList;
};
