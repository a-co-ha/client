import { api } from '../config/api-config';
export const getOrg = async (org: string) => {
  try {
    const res = await api.post(`/api/github/org`, { org });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
