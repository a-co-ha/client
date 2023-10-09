import { api } from '../config/api-config';
export const getRepos = async () => {
  try {
    const res = await api.post(`/api/github/repos`);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
