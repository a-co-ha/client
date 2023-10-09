import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteBookmark } from '@/pages/api/socket/deleteBookmark';
import type { AxiosError } from 'axios';

export const useDeleteBookmark = (
  channelId: string,
  pageId: string,
  bookmarkId: string
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosError>(
    [`deleteBookmark`, pageId],
    () => deleteBookmark(channelId, bookmarkId),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([`getChatBookmarks`, pageId]);
      },
    }
  );
};
