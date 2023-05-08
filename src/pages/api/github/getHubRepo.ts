import { api } from '../config/api-config';
export const getRepo = async (repo: string) => {
  try {
    const res = await api.post(`/api/github/repo`, {
      repo,
    });
    console.log(`github-repo`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
