import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getBookmarks } from '@/pages/api/socket/getBookmarks';
import type { AxiosError } from 'axios';
import type { ChatBookmarkList } from '@/pages/api/socket/type';

export const useGetBookmarks = (
  pageId: string,
  options?: UseQueryOptions<ChatBookmarkList, AxiosError>
) => {
  return useQuery<ChatBookmarkList, AxiosError>(
    [`getChatBookmarks`, pageId],
    () => getBookmarks(pageId),
    options
  );
};
