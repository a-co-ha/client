import { getOrg } from '@/pages/api/github/getHubOrg';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { commitLogModalOrgSearchState } from '@/recoil/github/atom';
import type { CommitLogOrgResponse } from '@/pages/api/github/type';

export const useGetOrg = (channelId: string | string[] | undefined) => {
  const setOrg = useSetRecoilState(commitLogModalOrgSearchState);
  return useMutation<CommitLogOrgResponse, AxiosError, string>(
    [`getOrg`, channelId],
    (org: string) => getOrg(org),
    {
      onSuccess: async (data) => {
        console.log('org 하나에용', data);
        setOrg(data);
      },
    }
  );
};
