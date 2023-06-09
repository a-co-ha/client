import { Control, useController } from 'react-hook-form';
import type { ProjectChangeImage } from '@/components/navbar/type';

export const usePorjectChangeImgForm = ({
  control,
}: {
  control: Control<ProjectChangeImage>;
}) => {
  const {
    field: projectChangeImage,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name: 'projectChangeImage',
    control,
    rules: {
      required: true,
    },
  });
  return { projectChangeImage, error, isSubmitting };
};
