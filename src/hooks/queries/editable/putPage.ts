import { useQueryClient, useMutation } from '@tanstack/react-query';
import { putEditablePage } from '@/pages/api/editable/putPage';
import type { AxiosError } from 'axios';
import type { PostEditablePage } from '@/pages/api/editable/type';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';

export const usePutEditablePage = (
  channelId: string | string[] | undefined,
  pageId: string,
  type: string
) => {
  const { pageId: templatePageId } = useGetUrlInfo();
  const queryClient = useQueryClient();
  return useMutation<PostEditablePage, AxiosError, string>(
    [`putEditablePage`, pageId],
    (pageName) => putEditablePage(channelId, pageId, pageName),
    {
      onSuccess: () => {
        if (type === 'progress-page') {
          return queryClient.invalidateQueries([
            `editablePage`,
            templatePageId,
          ]);
        }
        if (channelId) {
          return queryClient.invalidateQueries([`channelPages`, channelId]);
        }
      },
    }
  );
};
