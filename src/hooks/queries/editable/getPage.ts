import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getEditablePage } from '@/pages/api/editable';
import type { AxiosError } from 'axios';

export const useGetEditablePage = (
  channelId: string,
  pageId: string,
  type: string
) => {
  return useQuery([`editablePage`, pageId], () => {
    return getEditablePage(channelId, pageId, type);
  });
};
