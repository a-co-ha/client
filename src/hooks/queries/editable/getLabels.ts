import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getLabels } from '@/pages/api/editable/getLabels';
import type { AxiosError } from 'axios';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';

export interface Label {
  content: string;
  _id: string;
}

export const useGetLabels = (pageId: string | string[] | undefined) => {
  const { channelId, type } = useGetUrlInfo();
  return useQuery([`labels`, pageId], () => getLabels(channelId, pageId, type));
};
