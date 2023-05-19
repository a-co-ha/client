import { getRepoIssue } from '@/pages/api/github/getRepoIssue';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { commitDataTransfer } from '@/utils/commitDataTransfer';
import {
  githubRepoIssueState,
  githubCommitErrorState,
} from '@/recoil/github/atom';
import type { OrgRepoName, IssueList } from '@/pages/api/github/type';

export const useGetRepoIssue = (channelId: string | string[] | undefined) => {
  const setRepoIssue = useSetRecoilState(githubRepoIssueState);
  const setError = useSetRecoilState(githubCommitErrorState);
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults([`getRepoIssue`, channelId], {
    staleTime: 1000 * 60 * 2,
  });
  return useMutation<IssueList[], AxiosError, OrgRepoName>(
    [`getRepoIssue`, channelId],
    (orgRepoName: OrgRepoName) =>
      getRepoIssue(orgRepoName.org, orgRepoName.repo),
    {
      onSuccess: async (data) => {
        console.log('repoIssues', data);
        const issueList = await commitDataTransfer(data);
        issueList == null ? setError(true) : setRepoIssue(issueList);
      },
    }
  );
};
