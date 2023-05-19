import { useQuery } from '@tanstack/react-query';
import { getProgressPercent } from '@/pages/api/templete/getProgressPercent';

export const useGetProgressPercent = (pageId: string) => {
  return useQuery(['getProgressPercent', pageId], () =>
    getProgressPercent(pageId)
  );
};
