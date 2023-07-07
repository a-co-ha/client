import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteProject } from '@/pages/api/project/deleteProject';
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { channelNameState } from '@/recoil/project/atom';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import type { AxiosError } from 'axios';
import type { User } from '@/pages/api/user/type';

export const useDeleteProject = (channelId: string | string[] | undefined) => {
  const queryClient = useQueryClient();
  const setChannelName = useSetRecoilState(channelNameState);
  const resetChannelName = useResetRecoilState(channelNameState);
  const router = useRouter();
  const userId = getCookie(`myUserId`);

  return useMutation<User, AxiosError>(
    [`deleteProject`, channelId],
    () => deleteProject(channelId),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries([`user`, userId]);
        if (data.channels.length === 0) {
          console.log(`channel리스트 0개`, data.channels);
          resetChannelName();
          await router.push(`/main`);
        } else {
          console.log(`channel리스트 ?개`, data.channels);
          setChannelName(data.channels[0].channelName);
          await router.push(`/project/${data.channels[0].id}`);
        }
      },
    }
  );
};
