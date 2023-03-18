import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  userDataState,
  initialUserState,
  loginState,
} from '@/recoil/user/atom';

import { oauthLogin } from '../api/user/oauthLogin';
import { getUser } from '../api/user/getUser';
import { setToken } from '../api/user/setToken';

const Callback = () => {
  const setUserData = useSetRecoilState(userDataState);
  const setInitialUser = useSetRecoilState(initialUserState);
  const setIsLoggedIn = useSetRecoilState(loginState);
  const router = useRouter();
  const authCode = router.query.code;
  console.log('authcode', authCode);
  useEffect(() => {
    router.prefetch(`/project/[id]`);
  });
  useEffect(() => {
    if (!router.isReady) return;
    const getUserData = async () => {
      try {
        console.log(authCode);
        await oauthLogin(authCode);
        // 토큰 저장 해야함
        const userData = await getUser();
        console.log(userData);
        const initialUser = userData.channels.length === 0 ? true : false;

        console.log(initialUser);
        setUserData(userData);
        setInitialUser(initialUser);
        setIsLoggedIn(true);
        initialUser
          ? router.push(`/main`)
          : router.push(`/project/${userData.channels[0].id}`);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [router.isReady]);
  return (
    <div>
      <div>oauth 로그인중</div>
    </div>
  );
};

export default Callback;
