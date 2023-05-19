import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getRepo } from '../../pages/api/github/getHubRepo';
import { useSetRecoilState } from 'recoil';
import {
  commitLogModalRepoSearchState,
  githubCommitErrorState,
} from '@/recoil/github/atom';

export const useGetRepo = (channelId: string | string[] | undefined) => {
  const queryClient = useQueryClient();
  const setRepo = useSetRecoilState(commitLogModalRepoSearchState);
  const setError = useSetRecoilState(githubCommitErrorState);
  queryClient.setQueryDefaults([`getRepo`, channelId], {
    staleTime: 1000 * 60 * 2,
  });
  return useMutation([`getRepo`, channelId], (repo: string) => getRepo(repo), {
    onSuccess: async (data) => {
      if (data == null) {
        setError(true);
        console.log(`github Error!`);
      }
      console.log('repo 하나조회입니다', data);
      setRepo(data);
    },
    onError: async () => {
      setError(true);
    },
  });
};
