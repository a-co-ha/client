import { useForm } from 'react-hook-form';
import { useProjectDeleteVerificationForm } from '@/hooks/form/useProjectDeleteVerificationForm';
import { useDeleteProject } from '@/hooks/queries/project/deleteProject';
import { deleteModalState } from '@/recoil/project/atom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { channelNameState } from '@/recoil/project/atom';
import * as styles from './styles';
import type { ProjectDeleteName } from './type';

export const ProjectDeleteForm = ({
  channelId,
}: {
  channelId: string | string[] | undefined;
}) => {
  const channelName = useRecoilValue(channelNameState);
  const [isDeleteModal, setIsDeleteModal] = useRecoilState(deleteModalState);
  const deleteProject = useDeleteProject(channelId);

  const onClickHandler = () => {
    methods.reset();
    setIsDeleteModal(false);
  };

  const methods = useForm<ProjectDeleteName>({
    defaultValues: {
      ProjectDeleteName: '',
    },
    mode: 'onChange',
  });
  const { projectDeleteName, isSubmitting } = useProjectDeleteVerificationForm({
    control: methods.control,
  });

  const onSubmit = async () => {
    try {
      deleteProject.mutate();
      setIsDeleteModal(false);
      methods.reset();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div css={styles.projectInviteBox(isDeleteModal)}>
      <div
        onClick={onClickHandler}
        css={styles.inviteModalBackground(isDeleteModal)}
      ></div>
      <div css={styles.projectInviteBoxTransition(isDeleteModal)}>
        <div className="w-[70vw] max-w-[400px] overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <h3 className="mt-2">정말 프로젝트를 삭제할까요?</h3>
            <div className="mt-2">
              <p className="text-xs text-red-600 select-text">
                한 번 삭제하면 복구할 수 없습니다.
              </p>
              <p className="text-xs text-gray-500 select-text">
                삭제하시려면 "{channelName}" 를 입력해주세요
              </p>
            </div>
            <div className="mt-2">
              <input
                css={styles.projectDeleteInput}
                value={projectDeleteName.value}
                onChange={projectDeleteName.onChange}
                name={projectDeleteName.name}
                placeholder={channelName}
              />
            </div>
            <div className="mt-2 text-right">
              <button
                css={styles.projectDeleteNameBtn(
                  projectDeleteName.value,
                  channelName
                )}
                type="submit"
                disabled={
                  projectDeleteName.value === channelName
                    ? false
                    : true || isSubmitting
                }
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
