import { api } from '../config/api-config';

export const postSocketPage = async (channelId: string) => {
  const res = await api.post(`/api/page/socket?channel=${channelId}`);
  console.log(res.data.pageName);
};
