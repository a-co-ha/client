import { api } from '../config/api-config';
export const deleteNotice = async (
  id: string,
  channelId: string | string[] | undefined
) => {
  const { data } = await api.delete(
    `/api/announcements/${id}?channel=${channelId}`
  );
  return data;
};
