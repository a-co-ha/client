import { useQueryClient, useMutation } from '@tanstack/react-query';
import { patchBookmark } from '@/pages/api/socket/patchBookmark';
import type { AxiosError } from 'axios';
import type { ChatBookmark } from '@/pages/api/socket/type';
import type { ChatBookmarkFormType } from '@/components/chat-bookmark/type';

export const usePatchBookmark = (channelId: string, pageId: string) => {
  const queryClient = useQueryClient();
  return useMutation<ChatBookmark[], AxiosError, ChatBookmarkFormType>(
    (chatBookmark) =>
      patchBookmark(
        channelId,
        chatBookmark.id,
        chatBookmark.chatBookmarkTitle,
        chatBookmark.chatBookmarkContent
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`getChatBookmarks`, pageId]);
      },
    }
  );
};
