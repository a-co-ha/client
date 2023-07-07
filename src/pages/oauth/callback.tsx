import { Loading } from '@/components/loading/Loading';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { oauthLogin } from '@/pages/api/user/oauthLogin';
import { channelImageState, channelNameState } from '@/recoil/project/atom';
import { initialUserState, loginState } from '@/recoil/user/atom';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { api } from '../api/config/api-config';
import { setToken } from '../api/user/setToken';

export default function Callback({
  accessToken,
  refreshToken,
  sessionID,
  userId,
  userName,
}: {
  accessToken: string;
  refreshToken: string;
  sessionID: string;
  userId: number;
  userName: string;
}) {
  const setIsInitialUser = useSetRecoilState(initialUserState);
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setChannelName = useSetRecoilState(channelNameState);
  const setChannelImg = useSetRecoilState(channelImageState);
  const router = useRouter();
  const { data: userData } = useGetUser();
  setToken(accessToken, refreshToken, sessionID, userId, userName);
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
        : (router.push(`/project/${userData.channels[0].id}`),
          setChannelName(userData.channels[0].channelName)),
        setChannelImg(userData.channels[0].channelImg);
    }
  }, [userData]);

  return (
    <div>
      <Loading position="fixed" />
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
  const userName = logindata?.name;

  return {
    props: { accessToken, refreshToken, sessionID, userId, userName },
  };
};
