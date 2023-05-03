import { getRepository } from '@/pages/api/github/getHub';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetRepository = () => {
  return useMutation(() => getRepository());
};
