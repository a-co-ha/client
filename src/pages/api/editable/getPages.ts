import { api } from '../config/api-config';

export const getEditablePages = async (
  channelId: string | string[] | undefined
) => {
  const res = await api.get(`/api/list?channel=${channelId}`);
  console.log(res.data);
  return res.data.ListPage;
};
