import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>a-coha</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://acoha.site/" />
        <meta property="og:title" content="a-coha" />
        <meta property="og:image" content={'/images/channelImg/9.png'} />
        <meta property="og:description" content="프로젝트 관리 툴" />
        <meta property="og:site_name" content="a-coha" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
