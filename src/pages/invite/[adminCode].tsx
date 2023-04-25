import { useRouter } from 'next/router';
import { useInviteUser } from '@/hooks/queries/user/inviteUser';
import { useEffect } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import { api } from '../api/config/api-config';
import type { GetServerSideProps } from 'next';
import { QueryClient, useMutation } from '@tanstack/react-query';
import type { InviteUser } from '../api/user/type';
import { inviteUser } from '../api/user/inviteUser';
import type { AxiosError } from 'axios';

export default function InviteUser({ accessToken }: { accessToken: string }) {
  return console.log(`배포액토`, accessToken);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  // const { id: channelId, pageId, type } = context.query;
  try {
    const accessToken = getCookie(`accessToken`);
    console.log(`배포토큰`, accessToken);
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `access ${accessToken}`;
    }
    const { adminCode, channelCode } = context.query;
    console.log(`여기가 인바이트 유저`, adminCode, channelCode);
    const inviteUsers = useMutation<InviteUser, AxiosError>(
      () => inviteUser(adminCode, channelCode),
      {
        onSuccess: async (data) => {
          if (data) {
          }
        },
      }
    );
    if (inviteUser !== undefined) {
      inviteUsers.mutate();
    }
    return {
      props: { accessToken },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
};
