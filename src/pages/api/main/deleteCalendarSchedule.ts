import { api } from '../config/api-config';

export const deleteCalendarSchedule = async (
  channelId: string | string[] | undefined,
  scheduleId: number
) => {
  try {
    const res = await api.delete(
      `/api/calendar?channel=${channelId}&id=${scheduleId}`
    );
    console.log(`delete schedule`, res.data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
