import { api } from '../config/api-config';
export const registerHub = async (
  channelId: string | string[] | undefined,
  repoName: string,
  repoType: string
) => {
  try {
    const res = await api.post(`/api/github/register`, {
      channelId,
      repoName,
      repoType,
    });
    console.log(`register github`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
