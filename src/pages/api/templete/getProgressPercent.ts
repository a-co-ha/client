import { api } from '../config/api-config';

export const getProgressPercent = async (pageId: string) => {
  return await api.get(`/api/template/percentage/${pageId}`).then((res) => {
    console.log('progressGauge', res.data);
    return res.data;
  });
};
