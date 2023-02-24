import { Control, useController } from 'react-hook-form';
import type { ProjectTitle } from '@/components/project-sidebar/types';

export const useCreateProjectForm = ({
  control,
}: {
  control: Control<ProjectTitle>;
}) => {
  const { field: projectTitle, fieldState } = useController({
    name: 'projectTitle',
    control,
    rules: {
      required: '반드시 입력해주세요',
      min: { value: 2, message: '2글자 이상 입력해주세요.' },
      max: { value: 10, message: '최대 10글자까지 입력이 가능해요.' },
    },
  });
  const { error } = fieldState;
  return { projectTitle, error };
};
