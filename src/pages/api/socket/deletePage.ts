import { api } from '../config/api-config';
export const deleteSocketPage = async (
  channelId: string | string[] | undefined,
  roomId: string | string[] | undefined
) => {
  try {
    const res = await api.delete(
      `/api/page/room/${roomId}?channel=${channelId}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
