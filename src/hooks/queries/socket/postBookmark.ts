import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postBookmark } from '@/pages/api/socket/postBookmark';
import type { AxiosError } from 'axios';
import type { ChatBookmark } from '@/pages/api/socket/type';
import type { ChatBookmarkFormType } from '@/components/chat-bookmark/type';
import { useRouter } from 'next/router';

export const usePostBookmark = (channelId: string, pageId: string) => {
  const queryClient = useQueryClient();
  return useMutation<ChatBookmark[], AxiosError, ChatBookmarkFormType>(
    (chatBookmark) =>
      postBookmark(
        channelId,
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
