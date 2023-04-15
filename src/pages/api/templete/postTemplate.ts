import { nanoId } from '@/utils/nanoId';
import { api } from '../config/api-config';

export const postTemplate = (channelId: string, type: string) => {
  return api.post(
    `/api/template?type=template-${type}&channel=${channelId}`,
    { blockId: nanoId() }
  ).then((res => res.data));  
};
