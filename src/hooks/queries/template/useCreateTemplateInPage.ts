import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetUrlInfo } from '../../useGetUrlInfo';
import { postTemplateInPage } from '@/pages/api/templete/postTemplateInPage';

export const useCreateTemplateInPage = () => {
  const { channelId, pageId, type } = useGetUrlInfo();
  console.log(
    '🚀 ~ file: useCreateTemplateInPage.ts:7 ~ useCreateTemplateInPage ~ channelId, pageId, type:',
    channelId,
    pageId,
    type
  );
  return useMutation(() => postTemplateInPage(channelId, pageId, type));
};
