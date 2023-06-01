import { useQuery } from '@tanstack/react-query';
import { getProgressPercent } from '@/pages/api/templete/getProgressPercent';

export interface ProgressPercentData {
  percentage: number;
}

export const useGetProgressPercent = (
  pageId: string,
  inTemplate: string | string[] | undefined
) => {
  if (pageId !== '' && inTemplate !== 'progress-page') {
    return useQuery<ProgressPercentData>(['getProgressPercent', pageId], () =>
      getProgressPercent(pageId)
    );
  }

  return {
    data: null,
    isLoading: false,
    isError: false,
    error: null,
  };
};
