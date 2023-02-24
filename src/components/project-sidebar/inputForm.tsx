import { useForm } from 'react-hook-form';
import { useCreateProjectForm } from '@/hooks/useCreateProjectForm';
import * as styles from './styles';
import type { ProjectTitle } from './types';

export const InputForm = () => {
  const methods = useForm<ProjectTitle>({
    defaultValues: {
      projectTitle: '',
    },
  });

  const { projectTitle, error } = useCreateProjectForm({
    control: methods.control,
  });

  return (
    <div>
      <input
        css={styles.inputForm}
        value={projectTitle.value}
        onChange={projectTitle.onChange}
        placeholder="프로젝트 이름을 입력해주세요"
      />
      {error ? <p>{error.message}</p> : null}
    </div>
  );
};
