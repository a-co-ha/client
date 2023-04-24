import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { initialUserState, loginState } from '@/recoil/user/atom';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { setToken } from '../api/user/setToken';
import { api } from '../api/config/api-config';
import type { GetServerSideProps } from 'next';
import { oauthLogin } from '@/pages/api/user/oauthLogin';

export default function Callback({
  accessToken,
  refreshToken,
  sessionID,
  userId,
}: {
  accessToken: string;
  refreshToken: string;
  sessionID: string;
  userId: number;
}) {
  const setIsInitialUser = useSetRecoilState(initialUserState);
  const setIsLoggedIn = useSetRecoilState(loginState);
  const router = useRouter();
  const { data: userData } = useGetUser();
  setToken(accessToken, refreshToken, sessionID, userId);
  api.defaults.headers.common['Authorization'] = `access ${accessToken}`;
  useEffect(() => {
    router.prefetch(`/project`);
  }, [router.isReady]);
  useEffect(() => {
    if (userData !== undefined) {
      const initialUser = userData.channels.length === 0 ? true : false;
      setIsInitialUser(initialUser);
      setIsLoggedIn(true);
      initialUser
        ? router.push(`/main`)
        : router.push(`/project/${userData.channels[0].id}`);
    }
  }, [userData]);

  return (
    <div>
      <div>oauth 로그인중</div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authCode = context.query.code;
  const logindata = await oauthLogin(authCode);
  const accessToken = logindata?.accessToken;
  const refreshToken = logindata?.refreshToken;
  const sessionID = logindata?.sessionID;
  const userId = logindata?.userId;

  return {
    props: { accessToken, refreshToken, sessionID, userId },
  };
};
