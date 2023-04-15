import { api } from '../config/api-config';

export const patchProjectImage = async (channelId: number) => {
  try {
    const randomCount = Math.floor(Math.random() * 8 + 1);
    const formData = new FormData();
    await fetch(`/images/channelImg/${randomCount}.png`)
      .then((res) => res.blob())
      .then((blob) => {
        console.log(`blob`, blob);
        const file = new File([blob], 'image', { type: 'image/png' });
        formData.append(`image`, file, 'channelImg.png');
        // console.log(`getall`, formData.getAll(`channelImg`));
      });

    const res = await api.patch(
      `/api/channel/imageUpdate?channel=${channelId}`,
      { channelImg: formData.get('image') },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    // const formData = new FormData();
    // const blob = await fetch(`/images/channelImg/${randomCount}.png`).then(
    //   (res) => res.blob()
    // );
    // // .then((res) => res.blob())
    // // .then((blob) => {
    // // });
    // const nblob = new Blob([blob], { type: 'image/png' });
    // formData.append('image', nblob);
    // console.log(
    //   '🚀 ~ file: patchProjectImage.ts:14 ~ patchProjectImage ~ blob:',
    //   blob
    // );

    // for (const [key, value] of formData.entries()) {
    //   console.log(
    //     '🚀 ~ file: patchProjectImage.ts:18 ~ patchProjectImage ~ key, value:',
    //     key,
    //     value
    //   );
    // }

    // const res = await api.patch(
    //   `/api/channel/imageUpdate?channel=${channelId}`,
    //   { image: formData.get('image') },
    //   {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }
    // );
    console.log(
      '🚀 ~ file: patchProjectImage.ts:38 ~ patchProjectImage ~ res:',
      res.data
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
