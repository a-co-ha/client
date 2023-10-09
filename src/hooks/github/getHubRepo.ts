import {
  commitLogModalRepoSearchState,
  githubCommitErrorState,
} from '@/recoil/github/atom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { getRepo } from '../../pages/api/github/getHubRepo';

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
        `github Error!`;
      }
      setRepo(data);
    },
    onError: async () => {
      setError(true);
    },
  });
};
