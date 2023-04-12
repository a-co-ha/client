import { createReadStream } from 'fs';
import { blob } from 'stream/consumers';
import { api } from '../config/api-config';

export const patchProjectImage = async (
  channelId: string | string[] | undefined
) => {
  try {
    const randomCount = Math.floor(Math.random() * 10 + 1);

    const channelImg = await blob(
      createReadStream(`@/images/channelImg/${randomCount}.png`)
    );
    new Blob({});
    const formData = new FormData();
    formData.append(`channelImg`, `@/images/channelImg/${randomCount}.png`);
    console.log(`form`, formData);
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
