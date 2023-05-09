import { api } from '../config/api-config';

export const postSocketPage = async (
  channelId: string | string[] | undefined
) => {
  const res = await api.post(`/api/page/room?channel=${channelId}`);
  console.log(`소켓 페이지 생성`, res.data);
  return res.data.SocketPage;
};
