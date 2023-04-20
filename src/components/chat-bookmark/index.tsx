import { useSetRecoilState } from 'recoil';
import { chatBookmarkModalState } from '@/recoil/socket/atom';
import { ChatBookmarkModal } from './ChatBookmarkModal';
import * as styles from './styles';
import { useEffect } from 'react';
import { getBookmarks } from '@/pages/api/socket/getBookmarks';
import { channel } from '../project-sidebar/styles';

export const ChatBookmark = ({ channelId }: { channelId: string }) => {
  const setChatBookmarkModal = useSetRecoilState(chatBookmarkModalState);

  const onClickHandler = () => {
    setChatBookmarkModal(true);
  };
  useEffect(() => {
    getBookmarks(channelId);
  }, []);
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
