import { api } from '../config/api-config';

export const postCalendarSchedule = async (
  channelId: string | string[] | undefined,
  content: string,
  date: string
) => {
  try {
    const res = await api.post(`/api/calendar?channel=${channelId}`, {
      content,
      date,
    });
    return res.data;
  } catch (err) {
    console.error(`postCalendar`, err);
  }
};
