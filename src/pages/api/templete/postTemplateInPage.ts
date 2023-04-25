import { nanoId } from '@/utils/nanoId';
import { api } from '../config/api-config';

export const postTemplateInPage = async (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  type: string | string[] | undefined,
  progressStatus: string | null
) => {
  return await api
    .patch(`/api/template/${pageId}?type=${type}&channel=${channelId}`, {
      blockId: nanoId(),
      progressStatus,
    })
    .then((res) => res);
};
