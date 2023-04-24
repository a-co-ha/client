import { useQueryClient, useMutation } from '@tanstack/react-query';
import { putSocketPage } from '@/pages/api/socket/putPage';
import type { AxiosError } from 'axios';
import type { PutSocketPage } from '@/pages/api/socket/type';

export const usePutSocketPage = (
  channelId: string | string[] | undefined,
  pageId: string
) => {
  const queryClient = useQueryClient();
  return useMutation<PutSocketPage, AxiosError, string>(
    [`putSocketPage`, pageId],
    (pageName) => putSocketPage(channelId, pageId, pageName),
    {
      onSuccess: () => {
        if (channelId) {
          return queryClient.invalidateQueries([`channelPages`, channelId]);
        }
      },
    }
  );
};
