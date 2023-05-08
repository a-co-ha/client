import { api } from '../config/api-config';
export const getOrg = async (
  channelId: string | string[] | undefined,
  org: string
) => {
  try {
    const res = await api.post(`/api/github/org?channel=${channelId}`, {
      org,
    });
    console.log(`github-org`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
