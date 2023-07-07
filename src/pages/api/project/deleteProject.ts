import { api } from '../config/api-config';
export const deleteProject = async (
  channelId: string | string[] | undefined
) => {
  try {
    const res = await api.delete(`/api/channel/admin?channel=${channelId}`);
    console.log(`deleteProject`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
