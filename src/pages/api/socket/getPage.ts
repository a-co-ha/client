import { api } from '../config/api-config';

export const getSocketPage = async (pageId: string | string[] | undefined) => {
  try {
    const res = await api.get(`/api/page/room/${pageId}`);
    console.log(`socketpage 조회`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
