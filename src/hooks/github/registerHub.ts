import { registerHub } from '@/pages/api/github/registerHub';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import type { CommitLogOrgResponse } from '@/pages/api/github/type';
import type { CommitLogRepoResponse } from '@/pages/api/github/type';
import type { CommitLogGithubRegister } from '@/pages/api/github/type';

export const useRegisterHub = (channelId: string | string[] | undefined) => {
  return useMutation<
    CommitLogOrgResponse | CommitLogRepoResponse,
    AxiosError,
    CommitLogGithubRegister
  >(
    [`registerHub`, channelId],
    (registerData: CommitLogGithubRegister) =>
      registerHub(channelId, registerData.repoName, registerData.repoType),
    {
      onSuccess: (data) => {
        console.log('register', data);
      },
    }
  );
};
