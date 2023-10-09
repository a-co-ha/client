import { getOrgIssue } from '@/pages/api/github/getOrgIssue';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { commitDataTransfer } from '@/utils/commitDataTransfer';
import {
  githubOrgIssueState,
  githubCommitErrorState,
} from '@/recoil/github/atom';
import type { OrgRepoName, IssueList } from '@/pages/api/github/type';

export const useGetOrgIssue = (channelId: string | string[] | undefined) => {
  const setOrgIssue = useSetRecoilState(githubOrgIssueState);
  const setError = useSetRecoilState(githubCommitErrorState);
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults([`getOrgIssue`, channelId], {
    staleTime: 1000 * 60 * 2,
  });
  return useMutation<IssueList[], AxiosError, OrgRepoName>(
    [`getOrgIssue`, channelId],
    (orgRepoName: OrgRepoName) =>
      getOrgIssue(orgRepoName.org, orgRepoName.repo),
    {
      onSuccess: async (data) => {
        const issueList = await commitDataTransfer(data);
        issueList == null ? setError(true) : setOrgIssue(issueList);
      },
    }
  );
};
