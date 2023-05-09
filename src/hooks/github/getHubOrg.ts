import { getOrg } from '@/pages/api/github/getHubOrg';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { commitLogModalOrgSearchState } from '@/recoil/github/atom';

export const useGetOrg = () => {
  // const queryClient = useQueryClient();
  const setOrgSearchResponse = useSetRecoilState(commitLogModalOrgSearchState);
  return useMutation([`getOrg`], () => getOrg(), {
    onSuccess: (data) => {
      console.log('org입ㄴ디ㅏ', data);
      // queryClient.invalidateQueries([`channelPages`, channelId]);
      setOrgSearchResponse(data);
    },
  });
};
