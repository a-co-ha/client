import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { getRecentPosts } from '@/pages/api/main/getRecentlyPost';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface useGetRecentlyPostProps {
  _id: string;
  pageName: string;
  type: string;
  updatedAt: string;
}

export const useGetRecentPosts = (): UseQueryResult<
  useGetRecentlyPostProps[]
> => {
  const { channelId } = useGetUrlInfo();
  return useQuery(['recently', channelId], () => getRecentPosts(channelId));
};
