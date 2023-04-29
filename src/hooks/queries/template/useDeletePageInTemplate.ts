import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePageInTemplate } from '@/pages/api/templete/deletePageInTemplate';

export const useDeletePageInTemplate = (
  channelId: string | string[] | undefined,
  pageId: string,
  type: string
) => {
  const queryClient = useQueryClient();
  return useMutation(() => deletePageInTemplate(channelId, pageId, type), {
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries(['editablePage']),
        queryClient.invalidateQueries(['getProgressPercent']),
      ]),
  });
};
