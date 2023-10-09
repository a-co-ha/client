import Head from 'next/head';
import { DOMAIN } from '@/utils/const';
import acohaImg from '@/images/channelImg/1.png';

export const CustomHead = ({ type }: { type: string }) => {
  return type === `invite` ? (
    <Head>
      <title>A-COHA | 아코하</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:url" content={`https://acoha.site/*`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`A-COHA | 아코하`} />
      <meta property="og:title" content={`A-COHA | 아코하`} />
      <meta property="og:description" content={`아코하로 프로젝트 시작하기`} />
      <meta property="og:image" content={`${DOMAIN}/${acohaImg.src}`} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="300" />
    </Head>
  ) : (
    <Head>
      <title>아코하 : 아-코딩하고싶다</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="아코하로 프로젝트 시작하기" />

      <meta property="og:url" content={`https://acoha.site`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`아코하 : 아-코딩하고싶다`} />
      <meta property="og:title" content={`아코하 : 아-코딩하고싶다`} />
      <meta property="og:description" content={`신나게 코딩해보아요`} />
      <meta property="og:image" content={`${DOMAIN}/${acohaImg.src}`} />
    </Head>
  );
};
