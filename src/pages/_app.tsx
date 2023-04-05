import '@/styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { useState, useEffect, useMemo } from 'react';
import { MutableSnapshot, RecoilRoot, useSetRecoilState } from 'recoil';
import { loginState } from '@/recoil/user/atom';
import { Layout } from '@/components/layout';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie, setCookie } from 'cookies-next';
import { getToken } from './api/user/getToken';
import { io } from 'socket.io-client';
import { SocketContextProvider } from '@/components/chat-page/SocketContextProvider';
import type { AppContext, AppProps } from 'next/app';
interface MyAppProps extends AppProps {
  authState: {
    isLoggedIn: boolean;
  };
}

export default function App({ Component, pageProps, authState }: MyAppProps) {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    import('../mocks');
  }
  const [shouldRender, setShouldRender] = useState(
    !process.env.NEXT_PUBLIC_API_MOCKING
  );
  useEffect(() => {
    async function init() {
      const { initMocks } = await import('../mocks');
      await initMocks();

      setShouldRender(true);
    }
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      init();
    }
  }, []);
  if (!shouldRender) {
    // return null;
  }

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            // refetchOnMount: false,
            refetchOnWindowFocus: false,
            // suspense: true,
          },
          mutations: {
            useErrorBoundary: true,
          },
        },
      })
  );

  const initializer = useMemo(
    () =>
      ({ set }: MutableSnapshot) => {
        if (authState) {
          console.log(`이즈로그드인`, authState);
          set(loginState, authState.isLoggedIn);
        }
      },
    [authState]
  );
  useEffect(() => {
    const sessionId = getCookie(`sessionId`);
    if (sessionId) {
      const socket = io(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}`, {
        auth: {
          sessionId,
          userId: 96574345,
          name: 'tangjinlog',
          githubID: 'tangjinlog',
          githubURL: 'https://github.com/tangjinlog',
          img: 'https://avatars.githubusercontent.com/u/96574345?v=4',
        },
      });
      socket.on(`connect`, () => {
        console.log(`connected`);
      });
      console.log(`여기 소켓@@`, socket);
    }
  }, []);

  return (
    <RecoilRoot initializeState={initializer}>
      {/* <SocketContextProvider> */}
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Component {...pageProps} />
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            </Layout>
            <ToastContainer autoClose={2000} pauseOnHover />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
      {/* </SocketContextProvider> */}
    </RecoilRoot>
  );
}

App.getInitialProps = async (context: AppContext) => {
  const {
    ctx: { req, res },
    Component,
  } = context;
  let pageProps = {};
  let authState = {
    isLoggedIn: false,
  };
  try {
    // 새로고침시 전역 설정
    if (req) {
      const refreshToken = getCookie(`refreshToken`, { req, res });
      const accessToken = await getToken(refreshToken);
      setCookie(`accessToken`, accessToken, { req, res });
      refreshToken
        ? (authState.isLoggedIn = true)
        : (authState.isLoggedIn = false);
    }
  } catch (err) {
    authState = { isLoggedIn: false };
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(context.ctx);
  }
  return { pageProps, authState };
};
