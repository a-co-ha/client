import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateLabel } from '@/pages/api/editable/updateLabel';

export const usePutLabels = (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (selected: string[]) => updateLabel(channelId, pageId, selected),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries([`labels`, pageId]);
      },
    }
  );
};
