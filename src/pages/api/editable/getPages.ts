import { api } from '../config/api-config';

export const getChannelPages = async (
  channelId: string | string[] | undefined
) => {
  console.log(`채널아이디`, channelId);
  const res = await api.get(`/api/list?channel=${channelId}`);
  console.log(res.data);
  return res.data;
};
