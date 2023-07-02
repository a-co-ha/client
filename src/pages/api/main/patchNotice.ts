import { api } from '../config/api-config';
import type { patchNoticeInfo } from '@/hooks/queries/main/usePatchNotice';

export const patchNotice = async (
  post: patchNoticeInfo,
  channelId: string | string[] | undefined
) => {
  const { selectNoticeId, title, content } = post;
  await api.patch(`/api/announcements/${selectNoticeId}?channel=${channelId}`, {
    title,
    content,
  });
};
