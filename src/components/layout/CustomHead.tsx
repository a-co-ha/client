import Head from 'next/head';
import { DOMAIN } from '@/utils/const';
import acohaImg from '@/images/channelImg/1.png';
import type { OgData } from '../navbar/inviteModal';

export const CustomHead = ({ title, desc, image, id, type }: OgData) => {
  console.log(`customhead`, title, desc, image, id, type);

  return type === `invite` ? (
    <Head>
      <title>{title} | 아코하</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:url" content={`https://acoha.site/project/${id}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`${title} | 아코하`} />
      <meta property="og:title" content={`${title} | 아코하`} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
    </Head>
  ) : (
    <Head>
      <title>아코하 : 아-코딩하고싶다</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="신나게 코딩해보아요" />

      <meta property="og:url" content={`https://acoha.site`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`아코하 : 아-코딩하고싶다`} />
      <meta property="og:title" content={`아코하 : 아-코딩하고싶다`} />
      <meta property="og:description" content={`신나게 코딩해보아요`} />
      <meta property="og:image" content={`${DOMAIN}/${acohaImg}`} />
    </Head>
  );
};
