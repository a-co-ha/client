import { Control, useController } from 'react-hook-form';
import type { PageTitle } from '@/components/project-sidebar/types';

export const usePageTitleForm = ({
  control,
}: {
  control: Control<PageTitle>;
}) => {
  const {
    field: pageTitleField,
    formState: { errors },
  } = useController({
    name: 'pageTitle',
    control,
    rules: {
      required: true,
      minLength: { value: 2, message: '너무짧아요' },
      maxLength: { value: 10, message: '너무길어요' },
    },
  });
  return { pageTitleField, errors };
};
