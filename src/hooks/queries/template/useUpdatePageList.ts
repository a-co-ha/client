import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetUrlInfo } from '../../useGetUrlInfo';
import { patchPageList } from '@/pages/api/templete/patchPageList';

export const useUpadatePageList = () => {
  const { channelId, pageId, type } = useGetUrlInfo();
  const queryClient = useQueryClient();
  return useMutation(
    (pages: any[]) => patchPageList(channelId, pageId, type, pages),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['editablePage', pageId]);
      },
    }
  );
};
