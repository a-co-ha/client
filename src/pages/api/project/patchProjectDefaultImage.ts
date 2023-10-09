import { api } from '../config/api-config';

export const patchProjectDefaultImage = async (channelId: number) => {
  try {
    const randomCount = Math.floor(Math.random() * 10 + 1);
    const formData = new FormData();
    await fetch(`/images/channelImg/${randomCount}.png`)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'image', { type: 'image/png' });
        formData.append(`image`, file, 'channelImg.png');
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
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
