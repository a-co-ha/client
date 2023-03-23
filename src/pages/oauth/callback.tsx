import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  userDataState,
  initialUserState,
  loginState,
} from '@/recoil/user/atom';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { useQuery } from '@tanstack/react-query';
import { oauthLogin } from '@/pages/api/user/oauthLogin';

export default function Callback() {
  const setUserData = useSetRecoilState(userDataState);
  const setInitialUser = useSetRecoilState(initialUserState);
  const setIsLoggedIn = useSetRecoilState(loginState);
  const router = useRouter();
  const authCode = router.query.code;
  console.log('authCode 입니다', authCode);
  useEffect(() => {
    router.prefetch(`/project/[id]`);
  }, []);

  const tokenReady = useQuery([`oauthLogin`, authCode], () =>
    oauthLogin(authCode)
  );
  const { data: userData } = useGetUser({ enabled: !!tokenReady });
  useEffect(() => {
    if (userData !== undefined) {
      const initialUser = userData.channels.length === 0 ? true : false;
      setInitialUser(initialUser);
      initialUser
        ? router.push(`/main`)
        : router.push(`/project/${userData.channels[0].id}`);
    }
  }, []);
  return (
    <div>
      <div>oauth 로그인중</div>
    </div>
  );
}
