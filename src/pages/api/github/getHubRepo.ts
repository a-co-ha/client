import { api } from '../config/api-config';
export const getRepo = async (repo: string) => {
  try {
    const res = await api.post(`/api/github/repo`, { repo, type: 'repo' });
    console.log(`github-repo 하나조회`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
