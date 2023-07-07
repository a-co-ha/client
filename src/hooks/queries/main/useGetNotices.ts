import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { getNotices } from '@/pages/api/main/getNotices';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

export interface NoticeType {
  id: string;
  channelId: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
}

export const useGetNotices = (
  channelId: string | string[] | undefined
): UseInfiniteQueryResult<InfiniteData<NoticeType[]>, Error> => {
  return useInfiniteQuery(
    ['infinityNotices', channelId],
    ({ pageParam = 0 }) => getNotices(pageParam, channelId),
    {
      getNextPageParam: (data) => {
        if (!data[data.length - 1]) return null;
        const nextPageParam = data[data.length - 1]?.id - 1;
        return nextPageParam;
      },
    }
  );
};
