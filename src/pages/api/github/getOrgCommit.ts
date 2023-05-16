import { api } from '../config/api-config';
export const getOrgCommit = async (org: string, repo: string) => {
  try {
    const res = await api.post(`/api/github/commits`, { org, repo });
    console.log(`org-commits`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
