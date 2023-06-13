import { Control, useController } from 'react-hook-form';
import type {
  ProjectChangeInfo,
  ProjectChangeName,
} from '@/components/navbar/type';

export const useProjectChangeNameForm = ({
  control,
}: {
  control: Control<ProjectChangeName>;
}) => {
  const {
    field: projectChangeName,
    fieldState: { error: nameError },
    formState: { isSubmitting: nameIsSubmitting },
  } = useController({
    name: 'projectChangeName',
    control,
    rules: {
      required: true,
      minLength: { value: 1, message: '너무짧아요 (최소 1자)' },
      maxLength: { value: 15, message: '너무길어요 (최대 15자)' },
    },
  });
  return {
    projectChangeName,
    nameError,
    nameIsSubmitting,
  };
};
