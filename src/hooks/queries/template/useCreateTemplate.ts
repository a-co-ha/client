import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTemplate } from '@/pages/api/templete/postTemplate';
import { useRouter } from 'next/router';

export const useCreateTemplate = () => {
  const router = useRouter();
  const { id: channelId } = router.query;
  const queryClient = useQueryClient();
  return useMutation(
    (type: string) => postTemplate(channelId as string, type),
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
