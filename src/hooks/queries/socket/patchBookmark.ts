import { useQueryClient, useMutation } from '@tanstack/react-query';
import { patchBookmark } from '@/pages/api/socket/patchBookmark';
import type { AxiosError } from 'axios';
import type { ChatBookmark } from '@/pages/api/socket/type';
import type { ChatBookmarkPatchType } from '@/components/chat-bookmark/type';
import { useRouter } from 'next/router';

export const usePatchBookmark = (channelId: string, pageId: string) => {
  const queryClient = useQueryClient();
  return useMutation<ChatBookmark[], AxiosError, ChatBookmarkPatchType>(
    (bookmark) =>
      patchBookmark(
        channelId,
        bookmark.id,
        bookmark.chatBookmarkTitle,
        bookmark.chatBookmarkContent
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([`getChatBookmarks`, pageId]);
      },
    }
  );
};
