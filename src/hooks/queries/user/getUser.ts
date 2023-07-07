import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getUser } from '@/pages/api/user/getUser';
import { getCookie } from 'cookies-next';
import type { AxiosError } from 'axios';
import type { User } from '@/pages/api/user/type';

export const useGetUser = (options?: UseQueryOptions<User, AxiosError>) => {
  const userId = getCookie(`myUserId`);

  return useQuery<User, AxiosError>([`user`, userId], getUser, options);
};
