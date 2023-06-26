import { PostType } from '@/hooks/queries/main/usePostNotice';
import { api } from '../config/api-config';

export const postNotice = async (post: PostType) => {
  const { channelId, title, content } = post;
  await api.post(`/api/announcements/create?channel=${channelId}`, {
    title,
    content,
  });
};
