import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getBookmarks } from '@/pages/api/socket/getBookmarks';
import type { AxiosError } from 'axios';
import type { ChatBookmark } from '@/pages/api/socket/type';

export const useGetBookmarks = (
  channelId: string,
  pageId: string,
  options?: UseQueryOptions<ChatBookmark[], AxiosError>
) => {
  return useQuery<ChatBookmark[], AxiosError>(
    [`getChatBookmarks`, pageId],
    () => getBookmarks(channelId),
    options
  );
};
