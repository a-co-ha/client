import { Control, useController } from 'react-hook-form';
import type { PageName } from '@/components/project-sidebar/types';

export const usePageNameForm = ({
  control,
}: {
  control: Control<PageName>;
}) => {
  const {
    field: pageNameField,
    formState: { errors },
  } = useController({
    name: 'pageName',
    control,
    rules: {
      required: '꼭 필요해요',
      minLength: { value: 2, message: '너무짧아요' },
      maxLength: { value: 10, message: '너무길어요' },
    },
  });
  return { pageNameField, errors };
};
