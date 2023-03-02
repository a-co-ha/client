import { Control, useController } from 'react-hook-form';
import type { ProjectTitle } from '@/components/project-sidebar/types';

export const useCreateProjectForm = ({
  control,
}: {
  control: Control<ProjectTitle>;
}) => {
  const {
    field: projectTitle,
    fieldState: { error },
  } = useController({
    name: 'projectTitle',
    control,
    rules: {
      required: '꼭 필요해요',
      minLength: { value: 2, message: '너무 짧아요' },
      maxLength: { value: 10, message: '너무 길어요' },
    },
  });
  return { projectTitle, error };
};
