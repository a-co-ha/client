import { useQuery } from '@tanstack/react-query';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { getProgressPercentList } from '@/pages/api/main/getProgressPercentList';

export const useGetProgressPercentList = () => {
  const { channelId } = useGetUrlInfo();
  return useQuery(['getProgressPercentList'], () =>
    typeof channelId === 'string'
      ? getProgressPercentList(channelId)
      : undefined
  );
};
