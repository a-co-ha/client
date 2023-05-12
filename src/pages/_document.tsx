import { Html, Head, Main, NextScript } from 'next/document';
import acohaImage from '@/images/channelImg/1.png';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:title" content={`아코하`} key="og-title" />
        <meta
          property="og:description"
          content={`아코하입니다`}
          key="og-desc"
        />
        <meta property="og:url" content={`https://acoha.site`} key="og-url" />
        <meta property="og:image" content={acohaImage.src} key="og-image" />
        <meta property="og:site_name" content="acoha" key="og-site" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
