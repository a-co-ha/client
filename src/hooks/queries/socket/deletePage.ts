import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteSocketPage } from '@/pages/api/socket/deletePage';
import type { AxiosError } from 'axios';
import type { GetChannelPages } from '@/pages/api/editable/type';
import { useRouter } from 'next/router';

export const useDeleteSocketPage = (
  channelId: string | string[] | undefined,
  pageId: string
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<GetChannelPages, AxiosError>(
    [`deleteSocketPage`, pageId],
    () => deleteSocketPage(channelId, pageId),
    {
      onSuccess: async (data) => {
        if (data) {
          if (data.SocketPage.length !== 0) {
            await router.push(
              `/project/${data.channelId}/${
                data.SocketPage[data.SocketPage.length - 1].page._id
              }?name=${
                data.SocketPage[data.SocketPage.length - 1].page.pageName
              }&type=${data.SocketPage[data.SocketPage.length - 1].page.type}`
            );
          } else {
            router.push(`/project/${data.channelId}`);
          }

          queryClient.invalidateQueries([`channelPages`, channelId]);
        }
      },
    }
  );
};
