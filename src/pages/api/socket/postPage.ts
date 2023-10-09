import { api } from '../config/api-config';

export const postSocketPage = async (
  channelId: string | string[] | undefined
) => {
  const res = await api.post(`/api/page/room?channel=${channelId}`);
  return res.data;
};
