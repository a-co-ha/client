import { useQueryClient, useMutation } from '@tanstack/react-query';
import { inviteUser } from '@/pages/api/user/inviteUser';
import { InviteUser } from '@/pages/api/user/type';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/router';

export const useInviteUser = (
  adminCode: string | string[] | undefined,
  channelName: string | string[] | undefined
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  console.log(`인바이트`);
  return useMutation<InviteUser, AxiosError>(() =>
    inviteUser(adminCode, channelName)
  );
};
