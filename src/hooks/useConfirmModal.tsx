import * as styles from '@/components/project-main/styles';
import type { ConfirmModalType } from '@/pages/api/github/type';
import { confirmModalState } from '@/recoil/project/atom';
import { useRecoilState } from 'recoil';

export const ConfirmModal = ({
  modalKey,
  title,
  content,
  confirmFunc,
  cancelFunc,
}: ConfirmModalType) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    confirmModalState(modalKey)
  );

  const onClickHandler = () => {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
    cancelFunc();
  };
  return (
    <div tabIndex={0}>
      <div
        onClick={onClickHandler}
        css={styles.confirmModalBackground(isModalOpen)}
      />
      <div css={styles.confirmModalTransition(isModalOpen)}>
        <div css={styles.confimModalBox}>
          <h3>{title}</h3>
          <div css={styles.confirmModalContent}>"{content}"</div>
          <div css={styles.confirmModalBtnAlign}>
            <button
              css={styles.confirmModalCancelBtn}
              onClick={() => {
                cancelFunc();
                setIsModalOpen(false);
              }}
            >
              취소
            </button>
            <button css={styles.confirmModalConfirmBtn} onClick={confirmFunc}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
