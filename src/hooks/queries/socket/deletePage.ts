import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteSocketPage } from '@/pages/api/socket/deletePage';
import type { AxiosError } from 'axios';
import type { DeletePageResponse } from '@/components/editable-page/type';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';

export const useDeleteSocketPage = (
  channelId: string | string[] | undefined,
  pageId: string
) => {
  const queryClient = useQueryClient();
  return useMutation<AxiosError>(
    [`deleteSocketPage`, pageId],
    () => deleteSocketPage(channelId, pageId),
    {
      onSuccess: () => {
        if (channelId) {
          queryClient.invalidateQueries([`channelPages`, channelId]);
        }
      },
    }
  );
};
