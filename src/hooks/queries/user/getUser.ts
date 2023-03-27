import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUser } from '@/pages/api/user/getUser';
import type { AxiosError } from 'axios';
import type { User } from '@/pages/api/user/type';

export const useGetUser = (options?: UseQueryOptions<User, AxiosError>) => {
  return useQuery<User, AxiosError>([`user`], getUser, options);
};
