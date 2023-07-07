import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteCalendarSchedule } from '@/pages/api/main/deleteCalendarSchedule';
import { useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import type { AxiosError } from 'axios';
import type { User } from '@/pages/api/user/type';

export const useDeleteCalendarSchedule = (
  channelId: string | string[] | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation(
    [`deleteCalendarSchedule`, channelId],
    (scheduleId: number) => deleteCalendarSchedule(channelId, scheduleId),
    {
      onSuccess: async (data) => {
        queryClient.invalidateQueries([`getCalendarSchedule`, channelId]);
      },
    }
  );
};
