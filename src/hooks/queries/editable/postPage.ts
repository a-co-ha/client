import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postEditablePage } from '@/pages/api/editable';
import type { AxiosError } from 'axios';
import type { PostEditablePage } from '@/pages/api/editable/type';
import { useRouter } from 'next/router';

export const usePostEditablePage = () => {
  const router = useRouter();
  const { channelId } = router.query;
  const queryClient = useQueryClient();
  return useMutation<PostEditablePage, AxiosError>(
    () => postEditablePage(channelId),
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
