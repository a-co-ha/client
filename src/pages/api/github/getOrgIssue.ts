import { api } from '../config/api-config';
export const getOrgIssue = async (org: string | undefined, repo: string) => {
  try {
    const res = await api.post(`/api/github/issue`, { org, repo });
    console.log(`github 이슈`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
