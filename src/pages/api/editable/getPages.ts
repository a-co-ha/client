import { api } from '../config/api-config';

export const getEditablePages = async (
  channelId: string | string[] | undefined
) => {
  console.log(`채널아이디`, channelId);
  if (channelId) {
    const res = await api.get(`/api/list?channel=${channelId}`);
    console.log(res.data);
    return res.data.ListPage;
  } else return null;
};
