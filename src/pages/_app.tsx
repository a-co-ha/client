import '@/styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import type { AppProps } from 'next/app';
import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { Layout } from '@/components/layout';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import axios from 'axios';
import { setToken } from './api/user/setToken';
import { ToastContainer } from 'react-toastify';
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
    defaultOptions: {
      queries: {
        retry: 0,
        useErrorBoundary: true,
        notifyOnChangeProps: 'tracked',
        suspense: false,
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
