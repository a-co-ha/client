import { useQueryClient, useMutation } from '@tanstack/react-query';
import { exitProject } from '@/pages/api/project/exitProject';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { channelNameState } from '@/recoil/project/atom';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import type { AxiosError } from 'axios';
import type { User } from '@/pages/api/user/type';

export const useExitProject = (channelId: string | string[] | undefined) => {
  const queryClient = useQueryClient();
  const setChannelName = useSetRecoilState(channelNameState);
  const resetChannelName = useResetRecoilState(channelNameState);
  const router = useRouter();
  const userId = getCookie(`myUserId`);
  return useMutation<User, AxiosError>(
    [`exitProject`, channelId],
    () => exitProject(channelId),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries([`user`, userId]);
        if (data.channels.length === 0) {
          resetChannelName();
        } else {
          setChannelName(data.channels[0].channelName);
          router.replace(`/project/${data.channels[0].id}`);
        }
      },
    }
  );
};
