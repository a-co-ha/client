import { useRouter } from 'next/router';
import { useInviteUser } from '@/hooks/queries/user/inviteUser';
import { useEffect } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import { api } from '../api/config/api-config';
import type { GetServerSideProps } from 'next';
import { QueryClient } from '@tanstack/react-query';

export default function InviteUser({ accessToken }: { accessToken: string }) {
  return console.log(`배포액토`, accessToken);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  try {
    const accessToken = getCookie(`accessToken`);
    console.log(`배포토큰`, accessToken);
    if (accessToken) {
      api.defaults.headers.common['Authorization'] = `access ${accessToken}`;
    }
    const { adminCode, channelCode } = context.query;
    console.log(`여기가 인바이트 유저`, adminCode, channelCode);
    const inviteUser = useInviteUser(adminCode, channelCode);
    if (inviteUser !== undefined) {
      inviteUser.mutate();
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
