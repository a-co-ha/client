import { useQuery } from '@tanstack/react-query';
import { getProgressPercent } from '@/pages/api/templete/getProgressPercent';

export interface ProgressPercentData {
  percentage: number;
}

export const useGetProgressPercent = (pageId: string) => {
  return useQuery<ProgressPercentData>(['getProgressPercent', pageId], () =>
    getProgressPercent(pageId)
  );
};
