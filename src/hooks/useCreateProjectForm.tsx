import { Control, useController } from 'react-hook-form';
import type { ProjectName } from '@/components/project-sidebar/types';

export const useCreateProjectForm = ({
  control,
}: {
  control: Control<ProjectName>;
}) => {
  const {
    field: projectName,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name: 'projectName',
    control,
    rules: {
      required: '꼭 필요해요',
      minLength: { value: 2, message: '너무 짧아요' },
      maxLength: { value: 10, message: '너무 길어요' },
    },
  });
  return { projectName, error, isSubmitting };
};
