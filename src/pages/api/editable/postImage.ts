import { api } from '../config/api-config';

export const postImage = (formData: FormData) => {
  return api.post(`/api/page/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
