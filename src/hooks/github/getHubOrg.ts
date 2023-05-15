import { getOrg } from '@/pages/api/github/getHubOrg';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { commitLogModalOrgSearchState } from '@/recoil/github/atom';
import type { CommitLogOrgResponse } from '@/components/project-main/type';

export const useGetOrg = (channelId: string | string[] | undefined) => {
  // const queryClient = useQueryClient();
  const setOrg = useSetRecoilState(commitLogModalOrgSearchState);
  return useMutation<CommitLogOrgResponse, AxiosError, string>(
    [`getOrg`, channelId],
    (org: string) => getOrg(org),
    {
      onSuccess: (data) => {
        console.log('org 하나에용', data);
        // queryClient.invalidateQueries([`channelPages`, channelId]);
        setOrg(data);
      },
    }
  );
};
