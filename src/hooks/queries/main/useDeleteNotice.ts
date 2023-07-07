import { deleteNotice } from '@/pages/api/main/deleteNotice';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteNotice = (channelId: string | string[] | undefined) => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => deleteNotice(id, channelId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['infinityNotices', channelId]);
    },
  });
};
