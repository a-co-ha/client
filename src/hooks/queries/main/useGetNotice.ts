import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { getNotice } from '@/pages/api/main/getNotice';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { NoticeType } from './useGetNotices';

export const useGetNotice = (
  id: string,
  channelId: string | string[] | undefined
): UseQueryResult<NoticeType> => {
  return useQuery(['notice', id], () => getNotice(id, channelId));
};
