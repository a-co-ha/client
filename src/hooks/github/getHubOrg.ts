import { getOrg } from '@/pages/api/github/getHubOrg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import {
  commitLogModalOrgSearchState,
  githubCommitErrorState,
} from '@/recoil/github/atom';
import type { CommitLogOrgResponse } from '@/pages/api/github/type';

export const useGetOrg = (channelId: string | string[] | undefined) => {
  const setOrg = useSetRecoilState(commitLogModalOrgSearchState);
  const setError = useSetRecoilState(githubCommitErrorState);
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults([`getOrg`, channelId], {
    staleTime: 1000 * 60 * 2,
  });
  return useMutation<CommitLogOrgResponse, AxiosError, string>(
    [`getOrg`, channelId],
    (org: string) => getOrg(org),
    {
      onSuccess: async (data) => {
        if (data == null) {
          setError(true);
        }
        console.log('org 하나에용', data);
        setOrg(data);
      },
      onError: async (data) => {
        setError(true);
      },
    }
  );
};
