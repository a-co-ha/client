import { useInviteUser } from '@/hooks/queries/user/inviteUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function InviteUser() {
  const router = useRouter();
  const { adminCode, channelCode } = router.query;
  const inviteUser = useInviteUser(adminCode, channelCode);
  useEffect(() => {
    if (inviteUser !== undefined) {
      inviteUser.mutate();
    }
  }, []);
}
