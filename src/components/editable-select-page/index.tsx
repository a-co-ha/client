import { useRouter } from 'next/router';
import { usePostEditablePage } from '@/hooks/queries/editable/postPage';
import * as styles from './styles';
import { useCallback } from 'react';

interface SelectPage {
  closeModal: () => void;
}

/** editable-template 전용 컴포넌트 */
export const SelectPage = ({ closeModal }: SelectPage) => {
  const router = useRouter();
  const { id: channelId } = router.query;
  const { mutate: postPageMutate } = usePostEditablePage(channelId);
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const template = e.currentTarget.innerText;
    switch (template) {
      case 'normal':
        postPageMutate();
        closeModal();
        break;
    }
  };

  return (
    <div>
      <div css={styles.grid}>
        <div>
          <button css={styles.button} type="button" onClick={onClickHandler}>
            normal
          </button>
        </div>
        <div>
          <button css={styles.button} type="button">
            progress
          </button>
        </div>
        <div>
          <button css={styles.button} type="button">
            example1
          </button>
        </div>
        <div>
          <button css={styles.button} type="button">
            example2
          </button>
        </div>
      </div>
    </div>
  );
};
