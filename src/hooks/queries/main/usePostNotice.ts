import { postNotice } from '@/pages/api/main/postNotice';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface PostType {
  title: string;
  content: string;
}

export const usePostNotice = (channelId: string | string[] | undefined) => {
  const queryClient = useQueryClient();
  return useMutation((post: PostType) => postNotice(post, channelId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['infinityNotices', channelId]);
    },
  });
};
