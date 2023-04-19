import { useRouter } from 'next/router';
import { useInviteUser } from '@/hooks/queries/user/inviteUser';
import { useEffect } from 'react';
import { deleteCookie } from 'cookies-next';

export default function InviteUser() {
  const router = useRouter();
  deleteCookie(`accessToken`);
  const { adminCode, channelCode } = router.query;
  console.log(`여기가 인바이트 유저`, adminCode, channelCode);
  const inviteUser = useInviteUser(adminCode, channelCode);
  useEffect(() => {
    inviteUser.mutate();
  }, []);
}
