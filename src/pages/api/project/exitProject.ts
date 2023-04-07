import { api } from '../config/api-config';
export const exitProject = async (channelId: string | string[] | undefined) => {
  try {
    const res = await api.delete(`/api/channel/exit?channel=${channelId}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
