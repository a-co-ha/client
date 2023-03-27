import '@/styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { Layout } from '@/components/layout';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  QueryCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getCookie, getCookies, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import type { AppContext, AppProps } from 'next/app';
import { NextPageContext } from 'next';
import { api } from './api/config/api-config';

export default function App({ Component, pageProps }: AppProps) {
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
    console.log('window?', typeof window !== 'undefined');
    const token = getCookie('accessToken');
    if (token === undefined) {
      console.log('토큰없음');
    }
    api.defaults.headers.common['Authorization'] = `access ${token}`;
    console.log(`accessToken`, token);
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            // suspense: true,
          },
          mutations: {
            useErrorBoundary: true,
          },
        },
      })
  );

  return (
    <RecoilRoot>
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
    </RecoilRoot>
  );
}
