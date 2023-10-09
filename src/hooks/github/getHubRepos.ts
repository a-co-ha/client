import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getRepos } from '../../pages/api/github/getHubRepos';
import { useSetRecoilState } from 'recoil';
import { commitLogModalReposSearchState } from '@/recoil/github/atom';

export const useGetRepos = () => {
  const setRepoSearchResponse = useSetRecoilState(
    commitLogModalReposSearchState
  );
  const queryClient = useQueryClient();
  queryClient.setQueryDefaults([`getRepos`], {
    staleTime: 1000 * 60 * 2,
  });
  return useMutation([`getRepos`], () => getRepos(), {
    onSuccess: (data) => {
      setRepoSearchResponse(data);
    },
  });
};
