import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getSocketPage } from '@/pages/api/socket/getPage';
import type { AxiosError } from 'axios';
import type { SocketMessage } from '@/pages/api/socket/type';

export const useGetSocketPage = (
  pageId: string | string[] | undefined,
  options?: UseQueryOptions<SocketMessage[], AxiosError>
) => {
  return useQuery<SocketMessage[], AxiosError>(
    [`socketPage`, pageId],
    () => getSocketPage(pageId),
    options
  );
};
