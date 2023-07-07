import { Control, useController } from 'react-hook-form';
import type { AddSchedule } from '@/pages/api/main/type';

export const useCalendarForm = ({
  control,
}: {
  control: Control<AddSchedule>;
}) => {
  const {
    field: addSchedule,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name: 'addSchedule',
    control,
    rules: {
      required: true,
    },
  });
  return { addSchedule, error, isSubmitting };
};
