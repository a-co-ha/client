import { createReadStream } from 'fs';
import { blob } from 'stream/consumers';
import { Blob } from 'buffer';
import { api } from '../config/api-config';
import red from '@/images/channelImg/1.png';
import githubChannelImg from '@/images/github_channel.png';

export const patchProjectImage = async (channelId: number) => {
  try {
    const randomCount = Math.floor(Math.random() * 8 + 1);

    // const channelImg = await blob(
    //   createReadStream(`@/images/channelImg/${randomCount}.png`)
    // );
    // new Blob({});
    const formData = new FormData();
    // formData.append(`channelImg`, createReadStream(new Blob(red)));
    let values = formData.values();
    console.log(`form`, values);

    const res = await api.patch(
      `/api/channel/imageUpdate?channel=${channelId}`,
      { data: formData },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
