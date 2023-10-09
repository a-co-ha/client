import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTemplateInPage } from '@/pages/api/templete/postTemplateInPage';

export const useCreateTemplateInPage = (
  channelId: string,
  pageId: string,
  type: string
) => {
  // const { channelId, pageId, type } = useGetUrlInfo();
  const queryClient = useQueryClient();
  return useMutation(
    (progressStatus: string | null) =>
      postTemplateInPage(channelId, pageId, type, progressStatus),
    {
      onSuccess: () =>
        Promise.all([
          queryClient.invalidateQueries(['editablePage']),
          queryClient.invalidateQueries(['getProgressPercent']),
        ]),
    }
  );
};
