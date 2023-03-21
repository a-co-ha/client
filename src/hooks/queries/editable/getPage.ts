import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getEditablePage } from '@/pages/api/editable';
import type { AxiosError } from 'axios';
import type { Block } from '@/components/editable-page';

export const useGetEditablePage = (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  type: string | string[] | undefined,
  options?: UseQueryOptions<Block[], AxiosError>
) => {
  return useQuery<Block[], AxiosError>(
    [`editablePage`, channelId],
    () => getEditablePage(channelId, pageId, type),
    options
  );
};
