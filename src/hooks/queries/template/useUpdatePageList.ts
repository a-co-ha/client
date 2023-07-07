import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchPageList } from '@/pages/api/templete/patchPageList';

export const useUpadatePageList = (
  channelId: string,
  pageId: string,
  type: string
) => {
  const queryClient = useQueryClient();
  return useMutation(
    (pages: any[]) => patchPageList(channelId, pageId, type, pages),
    {
      onSuccess: () =>
        Promise.all([
          queryClient.invalidateQueries(['editablePage', pageId]),
          queryClient.invalidateQueries(['getProgressPercent', pageId]),
        ]),
    }
  );
};
