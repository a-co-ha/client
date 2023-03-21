import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postEditablePage } from '@/pages/api/editable';
import type { AxiosError } from 'axios';
import type { PostEditablePage } from '@/pages/api/editable/types';

export const usePostEditablePage = (
  channelId: string | string[] | undefined
) => {
  console.log('채널 아이디이이', channelId);
  const queryClient = useQueryClient();
  return useMutation<PostEditablePage, AxiosError>(
    () => postEditablePage(channelId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`editablePages`, channelId]);
      },
    }
  );
};
