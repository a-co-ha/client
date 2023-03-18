import { getChannelUsers } from '@/pages/api/common/users';
import { useQuery } from 'react-query';

export const useUsersQuery = () => {
  return useQuery(['users'], getChannelUsers);
};
