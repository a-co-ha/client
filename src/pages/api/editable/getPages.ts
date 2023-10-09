import { api } from '../config/api-config';

export const getChannelPages = async (
  channelId: string | string[] | undefined
) => {
  try {
    const res = await api.get(`/api/list?channel=${channelId}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
