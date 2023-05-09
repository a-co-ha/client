import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getRepo } from '../../pages/api/github/getHubRepo';
import { useSetRecoilState } from 'recoil';
import { commitLogModalRepoSearchState } from '@/recoil/github/atom';

export const useGetRepo = () => {
  const setRepoSearchResponse = useSetRecoilState(
    commitLogModalRepoSearchState
  );
  return useMutation([`getRepo`], () => getRepo(), {
    onSuccess: (data) => {
      console.log('repo 입니다', data);
      // queryClient.invalidateQueries([`channelPages`, channelId]);
      setRepoSearchResponse(data);
    },
  });
};
