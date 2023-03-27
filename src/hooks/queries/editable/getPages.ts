import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getEditablePages } from '@/pages/api/editable';
import type { AxiosError } from 'axios';
import type { GetEditablePages as pages } from '@/pages/api/editable/type';

export const useGetEditablePages = (
  channelId: string | string[] | undefined,
  options?: UseQueryOptions<pages[], AxiosError>
) => {
  return useQuery<pages[], AxiosError>(
    [`editablePages`, channelId],
    () => getEditablePages(channelId),
    options
  );
};
