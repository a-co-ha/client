import { registerHub } from '@/pages/api/github/registerHub';
import type {
  CommitLogGithubRegister,
  CommitRegisterResponse,
} from '@/pages/api/github/type';
import { githubConnectState } from '@/recoil/github/atom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

export const useRegisterHub = (channelId: string | string[] | undefined) => {
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults([`registerHub`, channelId], {
    staleTime: 1000 * 60 * 2,
  });
  const setGithubConnectData = useSetRecoilState(githubConnectState(channelId));
  const resetGithubConnectData = useResetRecoilState(
    githubConnectState(channelId)
  );
  const userId = getCookie(`myUserId`);
  return useMutation<
    CommitRegisterResponse,
    AxiosError,
    CommitLogGithubRegister
  >(
    [`registerHub`, channelId],
    (registerData: CommitLogGithubRegister) =>
      registerHub(channelId, registerData.repoName, registerData.repoType),
    {
      onSuccess: (data) => {
        'register', data;
        setGithubConnectData({
          repoName: data.name,
          repoType: data.type,
        });
        queryClient.invalidateQueries([`user`, userId]);
      },
    }
  );
};
