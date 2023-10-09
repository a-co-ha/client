import { api } from '../config/api-config';
export const getRepo = async (repo: string) => {
  try {
    const res = await api.post(`/api/github/repo`, { repo, type: 'repo' });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
