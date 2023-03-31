import { api } from '@/pages/api/config/api-config';

export const deleteImage = async (imgUrl: string) => {
  await api.post('/api/page/images/delete', { imgKey: imgUrl });
};
