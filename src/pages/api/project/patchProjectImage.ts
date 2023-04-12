import { api } from '../config/api-config';

export const patchProjectImage = async (channelId: number) => {
  try {
    const randomCount = Math.floor(Math.random() * 8 + 1);
    const formData = new FormData();

    await fetch(`/images/channelImg/${randomCount}.png`)
      .then((res) => res.blob())
      .then((blob) => {
        console.log(`blob`, blob);
        const file = new File([blob], `channelImg`, { type: 'image/png' });
        formData.append(`channelImg`, file);
        console.log(`getall`, formData.getAll(`channelImg`));
      });

    const res = await api.patch(
      `/api/channel/imageUpdate?channel=${channelId}`,
      { channelImg: formData },
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
