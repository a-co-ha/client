import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getEditablePage } from '@/pages/api/editable';
import type { AxiosError } from 'axios';
import type { Block } from '@/components/editable-page/type';

export const useGetEditablePage = (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  type: string | string[] | undefined
) => {
  return useQuery([`editablePage`, pageId], () =>
    getEditablePage(channelId, pageId, type)
  );
};
