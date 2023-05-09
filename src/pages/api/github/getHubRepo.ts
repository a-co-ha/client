import { api } from '../config/api-config';
export const getRepo = async () => {
  try {
    const res = await api.post(`/api/github/repos`);
    console.log(`github-repo`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
