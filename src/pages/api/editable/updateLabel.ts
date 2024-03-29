import { api } from '../config/api-config';

export const updateLabel = async (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  names: string[] | undefined
) => {
  try {
    await api.put(`/api/page/${pageId}?channel=${channelId}`, {
      label: names?.map((name) => ({ content: name })),
    });
  } catch (err) {
    console.error(err);
    return err;
  }
};
