import { getChannelUsers } from '@/api/users';
import { useQuery } from 'react-query';

export const useUsersQuery = () => {
  return useQuery(['users'], getChannelUsers);
};
