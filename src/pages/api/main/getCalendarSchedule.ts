import { api } from '../config/api-config';
export const getCalendarSchedule = async (
  channelId: string | string[] | undefined
) => {
  try {
    const res = await api.get(`/api/calendar?channel=${channelId}`);
    console.log(`get calendar`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
