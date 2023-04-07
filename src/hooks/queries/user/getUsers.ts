import { getUsers } from '@/pages/api/user/getUsers';
import { useQuery } from '@tanstack/react-query';
import type { ChannelUser } from '@/pages/api/user/type';
import { AxiosError } from 'axios';

export const useGetUsers = (channelId: string | string[] | undefined) => {
  return useQuery(['users', channelId], () => getUsers(channelId));
};
