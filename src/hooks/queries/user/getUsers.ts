import { UserInChannel } from '@/components/editable-block/type';
import { getUsers } from '@/pages/api/user/getUsers';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useGetUsers = () => {
  const router = useRouter();
  const channelId = router.query.id as string;

  return useQuery<UserInChannel[]>(['users', channelId], () =>
    getUsers(channelId)
  );
};
