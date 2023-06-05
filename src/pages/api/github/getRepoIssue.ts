import { api } from '../config/api-config';
export const getRepoIssue = async (owner: string | undefined, repo: string) => {
  try {
    const res = await api.post(`/api/github/issue`, { owner, repo });
    console.log(`github 이슈`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
