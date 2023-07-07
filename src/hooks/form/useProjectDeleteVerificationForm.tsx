import { Control, useController } from 'react-hook-form';
import type { ProjectDeleteName } from '@/components/navbar/type';

export const useProjectDeleteVerificationForm = ({
  control,
}: {
  control: Control<ProjectDeleteName>;
}) => {
  const {
    field: projectDeleteName,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name: 'ProjectDeleteName',
    control,
    rules: {
      required: true,
    },
  });
  return { projectDeleteName, error, isSubmitting };
};
