import { api } from '../config/api-config';

export const updateLabel = async (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  names: string[]
) => {
  try {
    await api.put(`/api/page/${pageId}?channel=${channelId}`, {
      label: names.map((name) => ({ content: name })),
    });
  } catch (err) {
    return console.log(err);
  }
};
