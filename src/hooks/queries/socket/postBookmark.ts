import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postBookmark } from '@/pages/api/socket/postBookmark';
import type { AxiosError } from 'axios';
import type { chatBookmark } from '@/pages/api/socket/type';
import { useRouter } from 'next/router';

export const usePostEditablePage = ({
  channelId,
  pageId,
  bookmarkName,
  content,
}: {
  channelId: string;
  pageId: string;
  bookmarkName: string;
  content: string;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<chatBookmark[], AxiosError>(
    () => postBookmark(channelId, bookmarkName, content),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([`getChatBookmarks`, pageId]);
      },
    }
  );
};
