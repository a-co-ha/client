import { getOrgCommit } from '@/pages/api/github/getOrgCommit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { commitDataTransfer } from '@/utils/commitDataTransfer';
import {
  githubOrgCommitState,
  githubCommitErrorState,
} from '@/recoil/github/atom';
import type { CommitList, OrgRepoName } from '@/pages/api/github/type';

export const useGetOrgCommit = (channelId: string | string[] | undefined) => {
  const setOrgCommit = useSetRecoilState(githubOrgCommitState);
  const setError = useSetRecoilState(githubCommitErrorState);
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults([`getOrgCommit`, channelId], {
    staleTime: 1000 * 60 * 2,
  });
  return useMutation<CommitList[], AxiosError, OrgRepoName>(
    [`getOrgCommit`, channelId],
    (orgRepoName: OrgRepoName) =>
      getOrgCommit(orgRepoName.org, orgRepoName.repo),
    {
      onSuccess: async (data) => {
        if (data == null) {
          setError(true);
        }
        console.log('orgCommits', data);
        const commitList = await commitDataTransfer(data);
        commitList == null ? setError(true) : setOrgCommit(commitList);
      },
    }
  );
};
