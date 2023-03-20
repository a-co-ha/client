import { api } from '../config/api-config';

export const getEditablePages = async (
  channelId: string | string[] | undefined
) => {
  const res = await api.get(`/api/page?channel=${channelId}`);
  return res.data.List;
};
