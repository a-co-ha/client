import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  userDataState,
  initialUserState,
  loginState,
} from '@/recoil/user/atom';

import { oauthLogin } from '../api/user/oauthLogin';

const Callback = () => {
  const setUserData = useSetRecoilState(userDataState);
  const setInitialUser = useSetRecoilState(initialUserState);
  const setIsLoggedIn = useSetRecoilState(loginState);
  const router = useRouter();
  const authCode = router.query.code;
  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log(authCode);
        const userData = await oauthLogin(authCode);
        const initialUser = !userData[0].channel_id;
        setUserData(userData);
        setInitialUser(initialUser);
        setIsLoggedIn(true);
        initialUser
          ? router.push(`/main`)
          : router.push(`/project/${userData[0].channel_id}`);
      } catch (err) {
        console.error(err);
      }
    };
    authCode && getUserData();
  }, [authCode]);
  return (
    <div>
      <div>oauth 성공</div>
    </div>
  );
};

export default Callback;
