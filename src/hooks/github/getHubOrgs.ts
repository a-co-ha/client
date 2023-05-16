import { getOrgs } from '@/pages/api/github/getHubOrgs';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { commitLogModalOrgsSearchState } from '@/recoil/github/atom';

export const useGetOrgs = () => {
  const setOrgSearchResponse = useSetRecoilState(commitLogModalOrgsSearchState);
  return useMutation([`getOrgs`], () => getOrgs(), {
    onSuccess: (data) => {
      console.log('org목록입니다', data);
      setOrgSearchResponse(data);
    },
  });
};
