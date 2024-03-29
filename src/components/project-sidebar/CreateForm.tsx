import { useForm } from 'react-hook-form';
import { useCreateProjectForm } from '@/hooks/useCreateProjectForm';
import { initialUserState } from '@/recoil/user/atom';
import { useSetRecoilState } from 'recoil';
import { usePostProject } from '@/hooks/queries/project/postProject';
import * as styles from './styles';
import type { ProjectName } from './type';

export const ProjectCreateForm = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const postProject = usePostProject();
  const setIsInitialUser = useSetRecoilState(initialUserState);
  const methods = useForm<ProjectName>({
    defaultValues: {
      projectName: '',
    },
    mode: 'onChange',
  });
  const { projectName, error, isSubmitting } = useCreateProjectForm({
    control: methods.control,
  });

  const onSubmit = async (channelName: ProjectName) => {
    postProject.mutate(channelName);
    closeModal();
    setIsInitialUser(false);
  };
  return (
    <div>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <input
          css={styles.projectNameInput(!!error)}
          value={projectName.value}
          onChange={projectName.onChange}
          name={projectName.name}
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
