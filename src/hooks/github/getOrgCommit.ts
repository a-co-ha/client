import { getOrgCommit } from '@/pages/api/github/getOrgCommit';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { githubOrgCommitState } from '@/recoil/github/atom';
import type { OrgCommitList } from '@/pages/api/github/type';
import type { OrgRepoName } from '@/pages/api/github/type';

export const useGetOrgCommit = (channelId: string | string[] | undefined) => {
  const setOrgCommit = useSetRecoilState(githubOrgCommitState);
  return useMutation<OrgCommitList[], AxiosError, OrgRepoName>(
    [`getOrgCommit`, channelId],
    (orgRepoName: OrgRepoName) =>
      getOrgCommit(orgRepoName.org, orgRepoName.repo),
    {
      onSuccess: (data) => {
        console.log('orgCommits', data);
        setOrgCommit(data);
      },
    }
  );
};
