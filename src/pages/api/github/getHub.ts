import { api } from '../config/api-config';
export const getRepository = async () => {
  try {
    const res = await api.post(`/api/github/org`, { org: 'a-co-ha' });
    console.log(`github`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
