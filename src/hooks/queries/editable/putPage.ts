import { useQueryClient, useMutation } from '@tanstack/react-query';
import { putEditablePage } from '@/pages/api/editable/putPage';
import type { AxiosError } from 'axios';
import type { PostEditablePage } from '@/pages/api/editable/type';

export const usePutEditablePage = (
  channelId: string | string[] | undefined,
  pageId: string
  // data: PageName
) => {
  const queryClient = useQueryClient();
  return useMutation<PostEditablePage, AxiosError, string>(
    [`putEditablePage`],
    (pageName) => putEditablePage(channelId, pageId, pageName),
    {
      onSuccess: () => {
        if (channelId) {
          return queryClient.invalidateQueries([`channelPages`, channelId]);
        }
      },
    }
  );
};
