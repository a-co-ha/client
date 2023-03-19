import '@/styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import type { AppProps } from 'next/app';
import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { Layout } from '@/components/layout';
import { setToken } from './api/user/setToken';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  QueryCache,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        console.log(error, query);
        //🎉 이미 캐시에 데이터가 있는 경우에만 오류 알림을 표시합니다.
        // 이는 백그라운드 업데이트가 실패했음을 의미합니다.
        if (query.state.data !== undefined) {
          toast.error(`에러가 났어요!! : ${(error as any).message}`);
        }
      },
    }),
    defaultOptions: {
      queries: {
        retry: 0,
        useErrorBoundary: true,
        notifyOnChangeProps: 'tracked',
        suspense: true,
      },
      mutations: {
        useErrorBoundary: true,
      },
    },
  });

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {/* <Hydrate state={pageProps.dehydratedState}> /} */}
          <Layout>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            <ToastContainer autoClose={2000} pauseOnHover />
          </Layout>
          {/* {/ </Hydrate> */}
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     console.log('cookie!!!!!', context.req.cookies);

//     return {
//       props: {},
//     };
//   } catch (err) {
//     return {
//       props: {},
//     };
//   }
// };

// useEffect(() => {
//   console.log(result)
//   const loadingFinishAll = result.some(result => result.isLoading)
// },[result])
