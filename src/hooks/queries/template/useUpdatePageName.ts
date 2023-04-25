import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetUrlInfo } from '../../useGetUrlInfo';
import { patchPageName } from '@/pages/api/templete/patchPageName';

export const useUpadatePageName = () => {
  const { channelId, pageId, type } = useGetUrlInfo();
  const queryClient = useQueryClient();
  return useMutation(
    (pageName: string) => patchPageName(channelId, pageId, type, pageName),
    {
      onSuccess: () => {
        if (channelId) {
          return queryClient.invalidateQueries([`channelPages`, channelId]);
        }
      },
    }
  );
};
