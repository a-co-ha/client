import { getUsers } from '@/pages/api/user/getUsers';
import { useQuery } from '@tanstack/react-query';

export const useGetUsers = () => {
  return useQuery(['users'], getUsers);
};
