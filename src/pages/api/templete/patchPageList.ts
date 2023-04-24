import { api } from '../config/api-config';

export const patchPageList = async (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  type: string | string[] | undefined,
  pages: string[]
) => {
  return await api
    .patch(`/api/template/update/${pageId}?channel=${channelId}&type=${type}`, {
      pages,
    })
    .then((res) => res?.data);
};
