import { useRouter } from 'next/router';
import { usePostEditablePage } from '@/hooks/queries/editable/postPage';
import * as styles from './styles';
import { useMemo } from 'react';

interface SelectPage {
  closeModal: () => void;
}

/** editable-template 전용 컴포넌트 */
export const SelectPage = ({ closeModal }: SelectPage) => {
  const router = useRouter();
  const { id: channelId } = router.query;
  const postEditablePage = usePostEditablePage(channelId);

  const onClickHandler = useMemo(
    () => (e: React.MouseEvent<HTMLButtonElement>) => {
      postEditablePage.mutate();
      const pageData = postEditablePage.data;

      console.log('페이지데이타', pageData);
      if (pageData !== undefined) {
        console.log(`pageData`, pageData);
        closeModal();
        router.push(
          `/project/${channelId}/${pageData._id}?name=${pageData.pageName}&type=${pageData.type}`
        );
      }
    },
    [postEditablePage.data]
  );

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
