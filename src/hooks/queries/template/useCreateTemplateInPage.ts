import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetUrlInfo } from '../../useGetUrlInfo';
import { postTemplateInPage } from '@/pages/api/templete/postTemplateInPage';

export const useCreateTemplateInPage = () => {
  const { channelId, pageId, type } = useGetUrlInfo();
  const queryClient = useQueryClient();
  return useMutation(() => postTemplateInPage(channelId, pageId, type), {
    onSuccess: () => {
      queryClient.invalidateQueries(['editablePage']);
    },
  });
};
