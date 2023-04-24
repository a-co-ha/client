import { createReadStream } from 'fs';
import { blob } from 'stream/consumers';
import { Blob } from 'buffer';
import { api } from '../config/api-config';
import red from '@/images/channelImg/1.png';
import githubChannelImg from '@/images/github_channel.png';

export const patchProjectImage = async (channelId: number) => {
  try {
    const randomCount = Math.floor(Math.random() * 8 + 1);

    const blob = await fetch(red.src).then((res) => res.blob());
    console.log('red', red);
    const formData = new FormData();
    formData.append('file', blob);
    console.log(
      '🚀 ~ file: patchProjectImage.ts:14 ~ patchProjectImage ~ blob:',
      blob
    );

    for (const [key, value] of formData.entries()) {
      console.log(
        '🚀 ~ file: patchProjectImage.ts:18 ~ patchProjectImage ~ key, value:',
        key,
        value
      );
    }

    const res = await api.patch(
      `/api/channel/imageUpdate?channel=${channelId}`,
      { channelImg: formData },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(
      '🚀 ~ file: patchProjectImage.ts:38 ~ patchProjectImage ~ res:',
      res.data
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
