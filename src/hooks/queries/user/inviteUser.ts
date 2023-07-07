import { useQueryClient, useMutation } from '@tanstack/react-query';
import { inviteUser } from '@/pages/api/user/inviteUser';
import { InviteUser } from '@/pages/api/user/type';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SocketContext } from '@/components/chat-page/SocketContextProvider';
import { getCookie } from 'cookies-next';
import type { AxiosError } from 'axios';

export const useInviteUser = (
  adminCode: string | string[] | undefined,
  channelName: string | string[] | undefined
) => {
  const { joinChannel } = useContext(SocketContext);
  const userId = getCookie(`myUserId`);
  const queryClient = useQueryClient();
  const router = useRouter();
  console.log(`인바이트`);
  return useMutation<InviteUser, AxiosError>(
    () => inviteUser(adminCode, channelName),
    {
      onSuccess: async (data) => {
        if (data) {
          queryClient.invalidateQueries([`user`, userId]);
          router.push(`/project/${data.channelId}`);
          joinChannel(String(data.channelId));
        }
      },
    }
  );
};
