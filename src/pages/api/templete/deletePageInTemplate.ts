import { api } from '../config/api-config';

export const deletePageInTemplate = async (
  channelId: string | string[] | undefined,
  pageId: string,
  type: string
) => {
  return await api.delete(
    `/api/page/${pageId}?type=${type}&channel=${channelId}`
  );
};
