import { getOrgCommit } from '@/pages/api/github/getOrgCommit';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { commitDataTransfer } from '@/utils/commitDataTransfer';
import { githubOrgCommitState } from '@/recoil/github/atom';
import type {
  OrgCommitList,
  OrgCommitTransferedData,
  OrgRepoName,
} from '@/pages/api/github/type';

export const useGetOrgCommit = (channelId: string | string[] | undefined) => {
  const setOrgCommit = useSetRecoilState(githubOrgCommitState);
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults([`getOrgCommit`, channelId], {
    staleTime: 1000 * 60 * 2,
  });
  return useMutation<OrgCommitList[], AxiosError, OrgRepoName>(
    [`getOrgCommit`, channelId],
    (orgRepoName: OrgRepoName) =>
      getOrgCommit(orgRepoName.org, orgRepoName.repo),
    {
      onSuccess: (data) => {
        console.log('orgCommits', data);
        const commitList = commitDataTransfer(data);
        setOrgCommit(commitList);
      },
    }
  );
};
