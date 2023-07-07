import { api } from '../config/api-config';

export const getNotice = async (
  id: string,
  channelId: string | string[] | undefined
) => {
  const { data } = await api.get(
    `/api/announcements/${id}?channel=${channelId}`
  );
  return data;
};
