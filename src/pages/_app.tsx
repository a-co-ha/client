import '@/styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';

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
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
