import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteEditablePage } from '@/pages/api/editable/deletePage';
import type { AxiosError } from 'axios';
import type { GetChannelPages } from '@/pages/api/editable/type';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { useRouter } from 'next/router';

export const useDeleteEditablePage = (
  channelId: string | string[] | undefined,
  pageId: string,
  type: string | string[] | undefined
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<GetChannelPages, AxiosError>(
    [`deleteEditablePage`, pageId],
    () => deleteEditablePage(channelId, pageId, type),
    {
      onSuccess: (data) => {
        if (channelId) {
          Promise.all([
            queryClient.invalidateQueries([`channelPages`, channelId]),
            queryClient.invalidateQueries([
              `getProgressPercentList`,
              channelId,
            ]),
          ]);
          if (data) {
            if (data.EditablePage.length !== 0) {
              const type =
                data.EditablePage[data.EditablePage.length - 1].page ||
                data.EditablePage[data.EditablePage.length - 1].template;
              router.push(
                `/project/${data.channelId}/${type._id}?name=${type.pageName}&type=${type.type}`
              );
            } else {
              router.push(`/project/${data.channelId}`);
            }
          }
        }
      },
    }
  );
};
