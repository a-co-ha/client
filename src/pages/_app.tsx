import '@/styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
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
import { SocketContextProvider } from '@/components/chat-page/SocketContextProvider';
import type { AppContext, AppProps } from 'next/app';
interface MyAppProps extends AppProps {
  authState: {
    isLoggedIn: boolean;
  };
}
import { CustomHead } from '@/components/layout/CustomHead';

export default function App({ Component, pageProps, authState }: MyAppProps) {
  const router = useRouter();

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
  useEffect(() => {
    router.pathname === `/project/:*` && authState.isLoggedIn === false
      ? router.push(`/error`)
      : null;
  }, []);
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

  return (
    <RecoilRoot initializeState={initializer}>
      <CustomHead type={`invite`} />
      <SocketContextProvider>
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
      </SocketContextProvider>
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
      console.log(`리프레에`, refreshToken);
      const accessToken = await getToken(refreshToken);
      setCookie(`accessToken`, accessToken, { req, res, maxAge: 60 * 60 * 24 });
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
