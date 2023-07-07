import { api } from '../config/api-config';
export const getOrgs = async () => {
  try {
    const res = await api.post(`/api/github/orgs`);
    console.log(`github-org`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
