import { api } from '../config/api-config';

export const postImage = async (formData: FormData) => {
  const res = await api.post(`/api/page/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.filePath;
};
