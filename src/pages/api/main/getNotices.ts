import { api } from '../config/api-config';

export const getNotices = async (
  id: number,
  channelId: string | string[] | undefined
) => {
  const { data } = await api.get(
    `/api/announcements?id=${id}&channel=${channelId}`
  );
  return data;
};
