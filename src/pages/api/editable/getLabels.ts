import { Label } from '@/hooks/queries/editable/getLabels';
import { api } from '../config/api-config';
export const getLabels = async (
  channelId: string | string[] | undefined,
  pageId: string | string[] | undefined,
  type: string | string[] | undefined
) => {
  try {
    const res = await api.get(
      `/api/page/${pageId}?type=${type}&channel=${channelId}`
    );
    const labels: Label[] | [] = res.data.label;
    return labels;
  } catch (err) {
    console.error(err);
    return null;
  }
};
