import { useInviteUser } from '@/hooks/queries/user/inviteUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
