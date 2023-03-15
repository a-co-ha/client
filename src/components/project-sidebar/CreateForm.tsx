import { useForm } from 'react-hook-form';
import { useCreateProjectForm } from '@/hooks/useCreateProjectForm';
import * as styles from './styles';
import type { ProjectTitle } from './types';

interface onClickHandler {
  onClickHandler: (projectTitle: ProjectTitle) => Promise<void>;
}

export const ProjectCreateForm = ({ onClickHandler }: onClickHandler) => {
  const methods = useForm<ProjectTitle>({
    defaultValues: {
      projectTitle: '',
    },
    mode: 'onChange',
  });
  const { projectTitle, error, isSubmitting } = useCreateProjectForm({
    control: methods.control,
  });
  const onSubmit = (data: ProjectTitle) => {
    console.log(data);
    onClickHandler(data);
  };
  return (
    <div>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <input
          css={styles.projectTitleInput(!!error)}
          value={projectTitle.value}
          onChange={projectTitle.onChange}
          name={projectTitle.name}
          placeholder={`프로젝트 이름을 입력해주세요. (2 ~ 10자)`}
        />
        <p css={styles.validationMsg}>{error ? error.message : 'ㅤ'}</p>
        <button
          css={styles.projectCreateBtn}
          type="submit"
          disabled={isSubmitting}
        >
          생성
        </button>
      </form>
    </div>
  );
};
