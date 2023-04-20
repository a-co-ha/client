import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  chatBookmarkFormModalState,
  chatBookmarkModalState,
  chatBookmarkState,
} from '@/recoil/socket/atom';
import { ChatBookmarkModal } from './ChatBookmarkModal';
import { ChatBookmarkForm } from './ChatBookmarkForm';
import { useEffect } from 'react';
import { useGetBookmarks } from '@/hooks/queries/socket/getBookmarks';
import * as styles from './styles';

export const ChatBookmark = ({
  channelId,
  pageId,
}: {
  channelId: string;
  pageId: string;
}) => {
  const { data: chatBookmarkList } = useGetBookmarks(channelId, pageId);
  const setChatBookmarkModal = useSetRecoilState(chatBookmarkModalState);
  const setChatBookmarkFormModal = useSetRecoilState(
    chatBookmarkFormModalState
  );
  const [chatBookmark, setChatBookmark] = useRecoilState(chatBookmarkState);

  const onClickHandler = () => {
    setChatBookmarkModal(true);
  };
  useEffect(() => {
    if (chatBookmarkList !== undefined) {
      setChatBookmark(chatBookmarkList);
    }
  }, [chatBookmarkList]);
  return (
    <div css={styles.chatBookmarkBox}>
      <div>chatBookmark</div>
      <ChatBookmarkModal />
      <ChatBookmarkForm />
      <button
        css={styles.chatBookmarkCreateBtn}
        onClick={() => setChatBookmarkFormModal(true)}
      >
        +
      </button>
      <div css={styles.chatBookmarkItemBox}>
        {chatBookmark &&
          chatBookmark.map((bookmark) => {
            return (
              <div css={styles.chatBookmarkItem} onClick={onClickHandler}>
                {bookmark.bookmarkName}
              </div>
            );
          })}
      </div>
    </div>
  );
};
