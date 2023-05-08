import { Control, useController } from 'react-hook-form';
import type { commitLogFormType } from '@/components/project-main/type';

export const useGithubRepoForm = ({
  control,
}: {
  control: Control<commitLogFormType>;
}) => {
  const {
    field: searchOptionsInput,
    fieldState: { error: searchOptionError },
  } = useController({
    name: 'searchOptionsInput',

    control,
    rules: {
      required: true,
    },
  });

  const {
    field: searchInput,
    fieldState: { error: contentError },
    formState: { isSubmitting },
  } = useController({
    name: 'searchInput',
    control,
    rules: {
      required: true,
    },
  });
  return {
    searchOptionsInput,
    searchInput,
    searchOptionError,
    contentError,
    isSubmitting,
  };
};
