import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetUrlInfo } from '../../useGetUrlInfo';
import { postTemplateInPage } from '@/pages/api/templete/postTemplateInPage';

export const useCreateTemplateInPage = () => {
  const { channelId, pageId, type } = useGetUrlInfo();
  const queryClient = useQueryClient();
  return useMutation(
    (progressStatus: string) =>
      postTemplateInPage(channelId, pageId, type, progressStatus),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['editablePage']);
      },
    }
  );
};
