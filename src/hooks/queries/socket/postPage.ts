import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postSocketPage } from '@/pages/api/socket/postPage';
import type { AxiosError } from 'axios';
import type { PutSocketPage } from '@/pages/api/socket/type';
import { useRouter } from 'next/router';

export const usePostSocketPage = () => {
  const router = useRouter();
  const { id: channelId } = router.query;
  const queryClient = useQueryClient();
  return useMutation<PutSocketPage, AxiosError>(
    () => postSocketPage(channelId),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([`channelPages`, channelId]);
        router.push(
          `/project/${channelId}/${data._id}?name=${data.pageName}&type=${data.type}`
        );
      },
    }
  );
};
