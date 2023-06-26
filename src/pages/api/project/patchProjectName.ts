import { api } from '../config/api-config';

export const patchProjectName = async (
  channelId: string | string[] | undefined,
  channelName: string
) => {
  try {
    const res = await api.patch(
      `/api/channel/nameUpdate?channel=${channelId}`,
      { channelName }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
