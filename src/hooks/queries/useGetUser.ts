import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { getUser } from '@/pages/api/user/getUser';
import type { User } from '@/pages/api/user/types';

export const useGetUser = (
  options?: UseQueryOptions<User, AxiosError, User, string[]>
): UseQueryResult<User, AxiosError> => {
  return useQuery([`user`], getUser, options);
};
