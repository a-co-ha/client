import { api } from '../config/api-config';
import type { SocketPage } from './type';

export const getSocketPage = async (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  type: string | string[] | undefined
) => {
  try {
    const res = await api.get(
      `/api/page/${pageId}?type=${type}&channel=${channelId}`
    );
    console.log(`socketpage 조회`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
