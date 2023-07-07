import { api } from '../config/api-config';

export const patchProjectImage = async (
  channelId: string | string[] | undefined,
  channelImg: any
) => {
  console.log(`여기서보자`, channelImg);
  try {
    const formData = new FormData();
    formData.append(`channelImg`, channelImg);
    const res = await api.patch(
      `/api/channel/imageUpdate?channel=${channelId}`,
      { channelImg: formData.get(`channelImg`) },
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
