import { useQueryClient, useMutation } from '@tanstack/react-query';
import { inviteUser } from '@/pages/api/user/inviteUser';
import { InviteUser } from '@/pages/api/user/type';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SocketContext } from '@/components/chat-page/SocketContextProvider';
import type { AxiosError } from 'axios';

export const useInviteUser = (
  adminCode: string | string[] | undefined,
  channelName: string | string[] | undefined
) => {
  const { joinChannel } = useContext(SocketContext);
  const queryClient = useQueryClient();
  const router = useRouter();
  console.log(`인바이트`);
  return useMutation<InviteUser, AxiosError>(
    () => inviteUser(adminCode, channelName),
    {
      onSuccess: async (data) => {
        if (data) {
          router.push(`/project/${data.channelId}`);
          joinChannel(String(data.channelId));
        }
      },
    }
  );
};
