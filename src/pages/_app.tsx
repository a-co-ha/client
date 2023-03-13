import '@/styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { Layout } from '@/components/layout';
import axios from 'axios';

axios.defaults.baseURL =
  'https://port-0-acoha-server-r8xoo2mles75ad6.sel3.cloudtype.app';

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

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  );
}
