import { getRepoCommit } from '@/pages/api/github/getRepoCommit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { commitDataTransfer } from '@/utils/commitDataTransfer';
import {
  githubRepoCommitState,
  githubCommitErrorState,
} from '@/recoil/github/atom';
import type { CommitList, OrgRepoName } from '@/pages/api/github/type';

export const useGetRepoCommit = (channelId: string | string[] | undefined) => {
  const setRepoCommit = useSetRecoilState(githubRepoCommitState);
  const setError = useSetRecoilState(githubCommitErrorState);
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults([`getRepoCommit`, channelId], {
    staleTime: 1000 * 60 * 2,
  });
  return useMutation<CommitList[], AxiosError, OrgRepoName>(
    [`getRepoCommit`, channelId],
    (orgRepoName: OrgRepoName) => getRepoCommit(orgRepoName.repo),
    {
      onSuccess: async (data) => {
        if (data == null) {
          setError(true);
        }
        const commitList = await commitDataTransfer(data);
        commitList == null ? setError(true) : setRepoCommit(commitList);
      },
    }
  );
};
