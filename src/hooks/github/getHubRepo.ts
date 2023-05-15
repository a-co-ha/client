import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getRepo } from '../../pages/api/github/getHubRepo';
import { useSetRecoilState } from 'recoil';

export const useGetRepo = (channelId: string | string[] | undefined) => {
  return useMutation([`getRepo`, channelId], (repo: string) => getRepo(repo), {
    onSuccess: (data) => {
      console.log('repo 하나조회입니다', data);
    },
  });
};
