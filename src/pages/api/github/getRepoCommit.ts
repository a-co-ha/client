import { api } from '../config/api-config';
export const getRepoCommit = async (
  owner: string | undefined,
  repo: string
) => {
  try {
    console.log(`오너`, owner);
    const res = await api.post(`/api/github/commits`, { owner, repo });
    console.log(`repo-commits`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
