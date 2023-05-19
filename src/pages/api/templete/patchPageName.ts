import { api } from '../config/api-config';

export const patchPageName = async (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  type: string | string[] | undefined,
  pageName: string
) => {
  return await api
    .patch(`/api/template/update/${pageId}?channel=${channelId}&type=${type}`, {
      pageName,
    })
    .then((res) => res?.data);
};
