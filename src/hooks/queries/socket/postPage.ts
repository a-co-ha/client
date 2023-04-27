import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postSocketPage } from '@/pages/api/socket/postPage';
import type { AxiosError } from 'axios';
import type { SocketPage } from '@/pages/api/socket/type';
import { useRouter } from 'next/router';

export const usePostSocketPage = () => {
  const router = useRouter();
  const { id: channelId } = router.query;
  const queryClient = useQueryClient();
  return useMutation<SocketPage, AxiosError>(() => postSocketPage(channelId), {
    onSuccess: (data) => {
      queryClient.invalidateQueries([`channelPages`, channelId]);
      router.push(
        `/project/${channelId}/${data.page._id}?name=${data.page.pageName}&type=${data.page.type}`
      );
    },
  });
};
