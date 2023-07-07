import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteBookmark } from '@/pages/api/socket/deleteBookmark';
import { useRouter } from 'next/router';
import type { AxiosError } from 'axios';

export const useDeleteBookmark = (
  channelId: string,
  pageId: string,
  bookmarkId: string
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

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
