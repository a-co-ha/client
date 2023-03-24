import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { initialUserState } from '@/recoil/user/atom';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { useQuery, QueryClient, dehydrate } from '@tanstack/react-query';
import { oauthLogin } from '@/pages/api/user/oauthLogin';
import { setToken } from '../api/user/setToken';
import { setCookie } from 'cookies-next';
import { api } from '../api/config/api-config';
import type { GetServerSideProps } from 'next';

export default function Callback({ authCode }: { authCode: string }) {
  const setInitialUser = useSetRecoilState(initialUserState);
  const router = useRouter();
  console.log(`여기에요!@!@@!`, authCode);
  const { data: token } = useQuery([`oauthLogin`, authCode], () =>
    oauthLogin(authCode)
  );
  console.log(token);
  // const { data: userData } = useGetUser();
  // console.log('authCode 입니다', authCode);

  useEffect(() => {
    router.prefetch(`/project`);
  }, [router.isReady]);

  // if (userData !== undefined && userData !== null) {
  //   const initialUser = userData.channels.length === 0 ? true : false;
  //   setInitialUser(initialUser);
  //   initialUser
  //     ? router.push(`/main`)
  //     : router.push(`/project/${userData.channels[0].id}`);
  // }

  return (
    <div>
      <div>oauth 로그인중</div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authCode = context.query.code;
  const queryClient = new QueryClient();
  console.log(authCode);
  try {
    api.get(`/api/oauth/github/callback?code=${authCode}`);
    if (authCode) {
      console.log('ha', authCode);
      await queryClient.prefetchQuery([`oauthLogin`, authCode], () =>
        oauthLogin(authCode)
      );
      // }
    }
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        authCode,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  } finally {
  }
  // await queryClient.prefetchQuery([`oauthLogin`], () =>
  //   oauthLogin(authCode, context)
  // );
  // try {
  //   console.log(authCode);
  //   return {
  //     props: {
  //       dehydratedProps: dehydrate(queryClient),
  //     },
  //   };
  // } catch (err) {
  //   console.error(err);
  //   return {
  //     notFound: true,
  //   };
  // } finally {
  //   queryClient.clear();
  // }
};

/**
 * 쿠키는 클라에서.
 *
 */
