import { useRouter } from 'next/router';
import { postEditablePage } from '@/pages/api/editable/postPage';

import * as styles from './styles';

interface SelectPage {
  closeModal: () => void;
}

/** editable-template 전용 컴포넌트 */
export const SelectPage = ({ closeModal }: SelectPage) => {
  const router = useRouter();
  const { id: channelId } = router.query;

  return (
    <div>
      <div css={styles.grid}>
        <div>
          <button
            css={styles.button}
            type="button"
            onClick={async () => {
              const [pageId, type] = await postEditablePage(channelId);
              closeModal();
              router.push(
                `http://localhost:3000/project/${channelId}/${pageId}?type=${type}`
              );
            }}
          >
            normal
          </button>
        </div>
        <div>
          <button
            css={styles.button}
            type="button"
            onClick={async () => {
              const [pageId, type] = await postEditablePage(channelId);
              closeModal();
              router.push(
                `http://localhost:3000/project/${channelId}/${pageId}?type=${type}`
              );
            }}
          >
            progress
          </button>
        </div>
        <div>
          <button
            css={styles.button}
            type="button"
            onClick={async () => {
              const [pageId, type] = await postEditablePage(channelId);
              closeModal();
              router.push(
                `http://localhost:3000/project/${channelId}/${pageId}?type=${type}`
              );
            }}
          >
            example1
          </button>
        </div>
        <div>
          <button
            css={styles.button}
            type="button"
            onClick={async () => {
              const [pageId, type] = await postEditablePage(channelId);
              closeModal();
              router.push(
                `http://localhost:3000/project/${channelId}/${pageId}?type=${type}`
              );
            }}
          >
            example2
          </button>
        </div>
      </div>
    </div>
  );
};

// const pageData = await axios.get(
//   `http://localhost:3000/api/post/${pageId}?channel=${channelId}`
// );

/**채널리스트의 버튼을 눌렀을 때
*-> 1차 판별. 방금 생성된 것인지
아니면 
*/