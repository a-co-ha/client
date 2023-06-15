import { getEditablePage } from '@/pages/api/editable';
import { useQuery } from '@tanstack/react-query';

export const useGetEditablePage = (
  channelId: string,
  pageId: string,
  type: string
) => {
  return useQuery([`editablePage`, pageId], () =>
    getEditablePage(channelId, pageId, type)
  );
};
