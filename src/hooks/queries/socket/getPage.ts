import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getSocketPage } from '@/pages/api/socket/getPage';
import type { AxiosError } from 'axios';
import type { SocketMessageResponse } from '@/pages/api/socket/type';

export const useGetSocketPage = (
  pageId: string | string[] | undefined,
  options?: UseQueryOptions<SocketMessageResponse, AxiosError>
) => {
  return useQuery<SocketMessageResponse, AxiosError>(
    [`socketPage`, pageId],
    () => getSocketPage(pageId),
    options
  );
};
