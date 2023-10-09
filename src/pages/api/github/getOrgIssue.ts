import { api } from '../config/api-config';
export const getOrgIssue = async (org: string | undefined, repo: string) => {
  try {
    const res = await api.post(`/api/github/issue`, { org, repo });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
