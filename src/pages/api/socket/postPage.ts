import { api } from '../config/api-config';

export const postSocketPage = async (
  channelId: string | string[] | undefined
) => {
  const res = await api.post(`/api/page/socket?channel=${channelId}`);
  return res.data;
  console.log(res.data.pageName);
};
