import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postEditablePage } from '@/pages/api/editable';
import type { AxiosError } from 'axios';
import type { PostEditablePage } from '@/pages/api/editable/type';

export const usePostEditablePage = (
  channelId: string | string[] | undefined
) => {
  console.log('채널 아이디이이', channelId);
  const queryClient = useQueryClient();
  return useMutation<PostEditablePage, AxiosError>(
    () => postEditablePage(channelId),
    {
      onSuccess: () => {
        if (channelId) {
          console.log(`석세스`);
          queryClient.invalidateQueries([`editablePages`, channelId]);
        }
      },
    }
  );
};
