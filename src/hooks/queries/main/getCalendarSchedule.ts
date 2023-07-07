import { getCalendarSchedule } from '@/pages/api/main/getCalendarSchedule';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { calendarScheduleState } from '@/recoil/project/atom';
import type { AxiosError } from 'axios';
import type { CalendarScheduleResponse } from '@/pages/api/main/type';

export const useGetCalendarSchedule = (
  channelId: string | string[] | undefined
) => {
  const setSchedule = useSetRecoilState(calendarScheduleState);
  return useQuery<CalendarScheduleResponse[], AxiosError>(
    [`getCalendarSchedule`, channelId],
    () => getCalendarSchedule(channelId),
    {
      onSuccess: async (data: CalendarScheduleResponse[]) => {
        setSchedule(data);
      },
    }
  );
};
