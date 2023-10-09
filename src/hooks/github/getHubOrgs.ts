import { getOrgs } from '@/pages/api/github/getHubOrgs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { commitLogModalOrgsSearchState } from '@/recoil/github/atom';

export const useGetOrgs = () => {
  const setOrgSearchResponse = useSetRecoilState(commitLogModalOrgsSearchState);
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults([`getOrgs`], {
    staleTime: 1000 * 60 * 2,
  });
  return useMutation([`getOrgs`], () => getOrgs(), {
    onSuccess: (data) => {
      'org목록입니다', data;
      setOrgSearchResponse(data);
    },
  });
};
