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
    defaultValue: 'organization',
    control,
    rules: {
      required: true,
    },
  });

  return {
    searchOptionsInput,
    searchOptionError,
  };
};
