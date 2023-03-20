import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  userDataState,
  initialUserState,
  loginState,
} from '@/recoil/user/atom';
import { useGetUser } from '@/hooks/queries/useGetUser';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { oauthLogin } from '@/pages/api/user/oauthLogin';
import { getUser } from '@/pages/api/user/getUser';

export default function Callback() {
  const setUserData = useSetRecoilState(userDataState);
  const setInitialUser = useSetRecoilState(initialUserState);
  const setIsLoggedIn = useSetRecoilState(loginState);
  const router = useRouter();
  useEffect(() => {
    router.prefetch(`/project/[id]`);
  });
  // const { data: loginData } = useOauthLogin(authCode);
  const { data: userData } = useGetUser();
  console.log(userData);
  useEffect(() => {
    if (userData !== undefined) {
      const initialUser = userData.channels.length === 0 ? true : false;
      setUserData(userData);
      setInitialUser(initialUser);
      setIsLoggedIn(true);
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const authCode = context.query.code;
  console.log('server', authCode);
  try {
    await queryClient.prefetchQuery([`oauthLogin`, authCode], () =>
      oauthLogin(authCode, context)
    );
    await queryClient.prefetchQuery([`user`], getUser);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
};
