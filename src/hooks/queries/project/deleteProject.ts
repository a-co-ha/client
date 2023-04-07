import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteProject } from '@/pages/api/project/deleteProject';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { channelNameState } from '@/recoil/project/atom';
import { useRouter } from 'next/router';
import type { AxiosError } from 'axios';
import type { DeleteProject } from '@/pages/api/project/type';
import type { ChannelList } from '@/pages/api/user/type';

export const useDeleteProject = (
  channelId: string | string[] | undefined,
  channelList: ChannelList[]
) => {
  const queryClient = useQueryClient();
  const setChannelName = useSetRecoilState(channelNameState);
  const resetChannelName = useResetRecoilState(channelNameState);
  const router = useRouter();

  return useMutation<DeleteProject, AxiosError>(
    [`deleteProject`, channelId],
    () => deleteProject(channelId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`user`]);
        if (channelList.length === 0) {
          resetChannelName();
        } else {
          setChannelName(channelList[0].channelName);
          router.replace(`/project/${channelList[0].id}`);
        }
      },
    }
  );
};
