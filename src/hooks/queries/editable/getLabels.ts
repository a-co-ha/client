import { useQuery } from '@tanstack/react-query';
import { getLabels } from '@/pages/api/editable/getLabels';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';

interface label {
  content: string;
  _id: string;
}

export const useGetLabels = () => {
  const router = useRouter();
  const { id: channelId, pageId, type } = router.query;
  return useQuery<label[], AxiosError>([`labels`, pageId], () =>
    getLabels(channelId, pageId, type)
  ).data?.map((item) => item.content);
};
