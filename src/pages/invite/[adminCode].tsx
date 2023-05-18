import { useRouter } from 'next/router';
import { useInviteUser } from '@/hooks/queries/user/inviteUser';
import { useEffect } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import { api } from '../api/config/api-config';

export default function InviteUser() {
  const router = useRouter();
  const { adminCode, channelCode } = router.query;
  console.log(`여기가 인바이트 유저`, adminCode, channelCode);
  const inviteUser = useInviteUser(adminCode, channelCode);
  useEffect(() => {
    if (inviteUser !== undefined) {
      inviteUser.mutate();
    }
  }, []);
}
