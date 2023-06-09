import { useRecoilState } from 'recoil';
import { confirmModalState } from '@/recoil/project/atom';
import { MODAL_KEY } from '@/utils/const';
import * as styles from '@/components/project-main/styles';
import type { ConfirmModalType } from '@/pages/api/github/type';

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
  // const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   (e.target as HTMLDivElement).focus();
  //   e.preventDefault();
  //   if (e.key === `Escape`) {
  //     setIsModalOpen(false);
  //     console.log('esc');
  //   }
  // };
  console.log(`focusContent`, content);
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
