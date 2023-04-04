import { useQueryClient, useMutation } from '@tanstack/react-query';
import { exitProject } from '@/pages/api/project/exitProject';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { channelNameState } from '@/recoil/project/atom';
import { useRouter } from 'next/router';
import type { AxiosError } from 'axios';
import type { ExitProject } from '@/pages/api/project/type';
import type { ChannelList } from '@/pages/api/user/type';

export const useExitProject = (
  channelId: string | string[] | undefined,
  channelList: ChannelList[]
) => {
  const queryClient = useQueryClient();
  const setChannelName = useSetRecoilState(channelNameState);
  const resetChannelName = useResetRecoilState(channelNameState);
  const router = useRouter();

  return useMutation<ExitProject, AxiosError>(
    [`exitProject`, channelId],
    () => exitProject(channelId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`user`]);
        if (channelList.length !== 1) {
          setChannelName(channelList[0].channelName);
          router.replace(`/project/${channelList[0].id}`);
        } else {
          resetChannelName();
        }
      },
    }
  );
};
