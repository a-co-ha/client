import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTemplate } from '@/pages/api/templete/postTemplate';
import { useRouter } from 'next/router';

export const useCreateTemplate = (type: string) => {
  const router = useRouter();
  const { channelId } = router.query;
  const queryClient = useQueryClient();
  return useMutation(() => postTemplate(channelId as string, type), {
    onSuccess: (data) => {
      queryClient.invalidateQueries([`channelPages`, channelId]);
      router.push(
        `/project/${channelId}/${data._id}?name=${data.pageName}&type=${data.type}`
      );
    },
  });
};
