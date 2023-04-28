import { api } from '../config/api-config';

export const deletePageInTemplate = async (
  channelId: string | string[] | undefined,
  pageId: string,
  type: string
) => {
  console.log('delete', channelId, pageId, type);
  return await api
    .delete(`/api/page/${pageId}?type=${type}&channel=${channelId}`)
    .then((res) => res?.data);
};
