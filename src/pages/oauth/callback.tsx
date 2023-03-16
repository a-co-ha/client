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
  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log(authCode);
        const user = await oauthLogin(authCode);
        setToken(user.accessToken);
        // 토큰 저장 해야함
        const userData = await getUser();
        console.log(userData);
        const initialUser =
          userData.userHasChannels.length === 0 ? true : false;

        console.log(initialUser);
        setUserData(userData);
        setInitialUser(initialUser);
        setIsLoggedIn(true);
        initialUser
          ? router.push(`/main`)
          : router.push(`/project/${userData.userHasChannels[0].channel_id}`);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [authCode]);
  return (
    <div>
      <div>oauth 로그인중</div>
    </div>
  );
};

export default Callback;
