import { api } from '../config/api-config';
export const getRepoCommit = async (repo: string) => {
  try {
    const res = await api.post(`/api/github/repo/commits`, { repo });
    console.log(`repo-commits`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
