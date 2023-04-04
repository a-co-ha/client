import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getSocketPage } from '@/pages/api/socket/getPage';
import type { AxiosError } from 'axios';
import type { SocketPage } from '@/pages/api/socket/type';

export const useGetSocketPage = (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  type: string | string[] | undefined,
  options?: UseQueryOptions<SocketPage, AxiosError>
) => {
  return useQuery<SocketPage, AxiosError>(
    [`socketPage`, pageId],
    () => getSocketPage(pageId),
    options
  );
};
