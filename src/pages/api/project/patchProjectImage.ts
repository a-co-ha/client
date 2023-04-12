import { createReadStream } from 'fs';
// import { blob } from 'stream/consumers';
import { api } from '../config/api-config';

export const patchProjectImage = async (channelId: number) => {
  try {
    const randomCount = Math.floor(Math.random() * 10 + 1);

    // const channelImg = await blob(
    //   createReadStream(`@/images/channelImg/${randomCount}.png`)
    // );
    // new Blob({});
    const formData = new FormData();
    formData.append(
      `channelImg`,
      createReadStream(`@/images/channelImg/${randomCount}.png`)
    );
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
