import { useQuery } from '@tanstack/react-query';
import { getLabels } from '@/pages/api/editable/getLabels';
import type { AxiosError } from 'axios';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';

interface label {
  content: string;
  _id: string;
}

export const useGetLabels = (pageId: string | string[] | undefined) => {
  const { channelId, type } = useGetUrlInfo();
  return useQuery<label[], AxiosError>([`labels`, pageId], () =>
    getLabels(channelId, pageId, type)
  );
};
