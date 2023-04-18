import { useSetRecoilState } from 'recoil';
import { chatBookmarkModalState } from '@/recoil/socket/atom';
import { ChatBookmarkModal } from './ChatBookmarkModal';
import * as styles from './styles';

export const ChatBookmark = () => {
  const setChatBookmarkModal = useSetRecoilState(chatBookmarkModalState);

  const onClickHandler = () => {
    setChatBookmarkModal(true);
  };

  return (
    <div css={styles.chatBookmarkBox}>
      <div>chatBookmark</div>
      <ChatBookmarkModal />
      <div css={styles.chatBookmarkItemBox}>
        <div css={styles.chatBookmarkItem} onClick={onClickHandler}>
          1
        </div>
        <div css={styles.chatBookmarkItem}>2</div>
        <div css={styles.chatBookmarkItem}>3</div>
      </div>
    </div>
  );
};
