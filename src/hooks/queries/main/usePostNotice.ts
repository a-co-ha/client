import { postNotice } from '@/pages/api/main/postNotice';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface PostType {
  channelId: string | string[] | undefined;
  title: string;
  content: string;
}

export const usePostNotice = (channelId: string | string[] | undefined) => {
  const queryClient = useQueryClient();
  return useMutation((post: PostType) => postNotice(post), {
    onSuccess: () => {
      queryClient.invalidateQueries(['infinityNotices', channelId]);
    },
  });
};
