import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getBookmarks } from '@/pages/api/socket/getBookmarks';
import type { AxiosError } from 'axios';
import type { chatBookmark } from '@/pages/api/socket/type';

export const useGetBookmarks = (
  channelId: string,
  pageId: string,
  options?: UseQueryOptions<chatBookmark[], AxiosError>
) => {
  return useQuery<chatBookmark[], AxiosError>(
    [`getChatBookmarks`, pageId],
    () => getBookmarks(channelId),
    options
  );
};
