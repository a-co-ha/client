import { useQueryClient, useMutation } from '@tanstack/react-query';
import { patchBookmark } from '@/pages/api/socket/patchBookmark';
import type { AxiosError } from 'axios';
import type { ChatBookmark } from '@/pages/api/socket/type';
import type { ChatBookmarkFormType } from '@/components/chat-bookmark/type';
import { useRouter } from 'next/router';

export const usePatchBookmark = (channelId: string, bookmarkId: string) => {
  const queryClient = useQueryClient();
  return useMutation<ChatBookmark[], AxiosError, ChatBookmarkFormType>(
    (chatBookmark) =>
      patchBookmark(
        channelId,
        pageId,
        bookmarkId,
        chatBookmark.chatBookmarkTitle,
        chatBookmark.chatBookmarkContent
      ),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([`getChatBookmarks`, pageId]);
      },
    }
  );
};
