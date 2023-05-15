import { Control, useController } from 'react-hook-form';
import type { CommitLogFormType } from '@/components/project-main/type';

export const useGithubRepoForm = ({
  control,
}: {
  control: Control<CommitLogFormType>;
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
