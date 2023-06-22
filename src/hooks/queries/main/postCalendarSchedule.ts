import { useQueryClient, useMutation } from '@tanstack/react-query';
import { postCalendarSchedule } from '@/pages/api/main/postCalendarSchedule';
import type { AxiosError } from 'axios';
import type { CalendarScheduleResponse } from '@/pages/api/main/type';

export const usePostCalendarSchedule = (
  channelId: string | string[] | undefined
) => {
  const queryClient = useQueryClient();
  return useMutation<
    CalendarScheduleResponse[],
    AxiosError,
    { content: string; date: string }
  >(
    [`PostCalendarSchedule`, channelId],
    (schedule) =>
      postCalendarSchedule(channelId, schedule.content, schedule.date),
    {
      onSuccess: (data: CalendarScheduleResponse[]) => {
        queryClient.invalidateQueries([`getCalendarSchedule`, channelId]);
      },
    }
  );
};
