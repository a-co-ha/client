import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postEditablePage } from '@/pages/api/editable';
import type { AxiosError } from 'axios';
import type { PostEditablePage } from '@/pages/api/editable/type';
import { useRouter } from 'next/router';

export const usePostEditablePage = (
  channelId: string | string[] | undefined
) => {
  console.log('채널 아이디이이', channelId);
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<PostEditablePage, AxiosError>(
    () => postEditablePage(channelId),
    {
      onSuccess: (data) => {
        if (channelId) {
          console.log(`석세스`, data);
          queryClient.invalidateQueries([`channelPages`, channelId]);
          router.push(
            `/project/${channelId}/${data._id}?name=${data.pageName}&type=${data.type}`
          );
        }
      },
    }
  );
};
