import { useRouter } from 'next/router';
import { usePostEditablePage } from '@/hooks/queries/editable/postPage';
import * as styles from './styles';

interface SelectPage {
  closeModal: () => void;
}

/** editable-template 전용 컴포넌트 */
export const SelectPage = ({ closeModal }: SelectPage) => {
  const router = useRouter();
  const { id: channelId } = router.query;
  const postEditablePage = usePostEditablePage(channelId);
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.innerText === 'normal') {
      postEditablePage.mutate(Number(channelId));
      const pageData = postEditablePage.data;
      closeModal();
      if (pageData !== undefined) {
        router.push(
          `/project/${channelId}/${pageData._id}?name=${pageData.pageName}&type=${pageData.type}`
        );
      }
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
