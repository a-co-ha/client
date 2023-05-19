import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getChannelPages } from '@/pages/api/editable';
import type { AxiosError } from 'axios';
import type { GetChannelPages as pages } from '@/pages/api/editable/type';

export const useGetChannelPages = (
  channelId: string | string[] | undefined,
  options?: UseQueryOptions<pages, AxiosError>
) => {
  return useQuery<pages, AxiosError>(
    [`channelPages`, channelId],
    () => getChannelPages(channelId),
    options
  );
};
