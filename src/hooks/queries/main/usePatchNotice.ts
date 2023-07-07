import { patchNotice } from '@/pages/api/main/patchNotice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { PostType } from './usePostNotice';

export interface patchNoticeInfo extends PostType {
  selectNoticeId: string;
}

export const usePatchNotice = (channelId: string | string[] | undefined) => {
  const queryClient = useQueryClient();
  return useMutation(
    ['patchNotice', channelId],
    (post: patchNoticeInfo) => patchNotice(post, channelId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['infinityNotices', channelId]);
      },
    }
  );
};
