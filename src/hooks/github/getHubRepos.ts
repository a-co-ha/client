import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getRepos } from '../../pages/api/github/getHubRepos';
import { useSetRecoilState } from 'recoil';
import { commitLogModalReposSearchState } from '@/recoil/github/atom';

export const useGetRepos = () => {
  const setRepoSearchResponse = useSetRecoilState(
    commitLogModalReposSearchState
  );
  return useMutation([`getRepos`], () => getRepos(), {
    onSuccess: (data) => {
      console.log('repo 입니다', data);
      // queryClient.invalidateQueries([`channelPages`, channelId]);
      setRepoSearchResponse(data);
    },
  });
};
