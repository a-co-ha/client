import { api } from '../config/api-config';

export const patchProjectImage = async (
  channelId: string | string[] | undefined,
  channelImg: any
) => {
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
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
