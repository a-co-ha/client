import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { initialUserState } from '@/recoil/user/atom';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { setToken } from '../api/user/setToken';
import { setCookie } from 'cookies-next';
import { api } from '../api/config/api-config';
import type { GetServerSideProps } from 'next';

export default function Callback({ cookies }: { cookies: any }) {
  const setInitialUser = useSetRecoilState(initialUserState);
  const router = useRouter();
  console.log(cookies);
  setCookie('accessToken', cookies.accessToken);
  setCookie('refreshToken', cookies.refreshToken);
  api.defaults.headers.common[
    'Authorization'
  ] = `access ${cookies.accessToken}`;
  const { data: userData } = useGetUser();
  useEffect(() => {
    router.prefetch(`/project`);
  }, [router.isReady]);
  useEffect(() => {
    if (userData !== undefined && userData !== null) {
      const initialUser = userData.channels.length === 0 ? true : false;
      setInitialUser(initialUser);
      initialUser
        ? router.push(`/main`)
        : router.push(`/project/${userData.channels[0].id}`);
    }
  });

  return (
    <div>
      <div>oauth 로그인중</div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authCode = context.query.code;
  const response = await api.get(`/api/oauth/github/callback?code=${authCode}`);
  const { accessToken, refreshToken } = response.data.token;
  const cookies = await setToken(accessToken, refreshToken, context);
  return {
    props: { cookies },
  };
};
