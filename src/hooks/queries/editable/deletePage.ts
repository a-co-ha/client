import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteEditablePage } from '@/pages/api/editable/deletePage';
import type { AxiosError } from 'axios';
import type { DeletePageResponse } from '@/components/editable-page/type';

export const useDeleteEditablePage = (
  channelId: string | string[] | undefined,
  pageId: string,
  type: string | string[] | undefined
) => {
  const queryClient = useQueryClient();
  return useMutation<DeletePageResponse, AxiosError>(
    [`deleteEditablePage`],
    () => deleteEditablePage(channelId, pageId, type),
    {
      onSuccess: () => {
        if (channelId) {
          queryClient.invalidateQueries([`editablePages`, channelId]);
        }
      },
    }
  );
};
