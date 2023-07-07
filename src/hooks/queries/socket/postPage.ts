import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postSocketPage } from '@/pages/api/socket/postPage';
import type { AxiosError } from 'axios';
import type { PostSocketPage } from '@/pages/api/socket/type';
import { useRouter } from 'next/router';

export const usePostSocketPage = () => {
  const router = useRouter();
  const { id: channelId } = router.query;
  const queryClient = useQueryClient();
  return useMutation<PostSocketPage, AxiosError>(
    () => postSocketPage(channelId),
    {
      onSuccess: async (data) => {
        console.log(`포스트페이지 데이타`, data);
        if (data) {
          await queryClient.invalidateQueries([`channelPages`, channelId]);
          await router.push(
            `/project/${channelId}/${data._id}?name=${data.pageName}&type=${data.type}`
          );
        }
      },
    }
  );
};
