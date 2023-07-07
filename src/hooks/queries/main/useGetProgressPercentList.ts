import { useQuery } from '@tanstack/react-query';
import { getProgressPercentList } from '@/pages/api/main/getProgressPercentList';

export const useGetProgressPercentList = (
  channelId: string | string[] | undefined
) => {
  return useQuery(['getProgressPercentList', channelId], () =>
    typeof channelId === 'string'
      ? getProgressPercentList(channelId)
      : undefined
  );
};
