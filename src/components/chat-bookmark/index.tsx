import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  chatBookmarkFormModalState,
  chatBookmarkFormDataState,
  chatBookmarkModalState,
  chatBookmarkState,
} from '@/recoil/socket/atom';
import { ChatBookmarkModal } from './ChatBookmarkModal';
import { ChatBookmarkForm } from './ChatBookmarkForm';
import { useEffect, useCallback, useContext, useLayoutEffect } from 'react';
import { useGetBookmarks } from '@/hooks/queries/socket/getBookmarks';
import { SocketContext } from '../chat-page/SocketContextProvider';
import * as styles from './styles';

export const ChatBookmark = ({
  channelId,
  pageId,
}: {
  channelId: string;
  pageId: string;
}) => {
  const { data: chatBookmarkList } = useGetBookmarks(pageId);
  const setChatBookmarkModal = useSetRecoilState(chatBookmarkModalState);
  const setChatBookmarkFormData = useSetRecoilState(chatBookmarkFormDataState);
  const setChatBookmarkFormModal = useSetRecoilState(
    chatBookmarkFormModalState
  );
  const [chatBookmark, setChatBookmark] = useRecoilState(chatBookmarkState);
  const { socket } = useContext(SocketContext);

  const addBookmark = useCallback((bookmark: any) => {
    console.log(`addBookmark`, bookmark);
    setChatBookmark((prev) => {
      const newBookmark = prev.concat([bookmark]);
      console.log(`newBook`, newBookmark);
      return newBookmark;
    });
  }, []);
  useEffect(() => {
    if (chatBookmarkList !== undefined) {
      setChatBookmark(chatBookmarkList);
      console.log(chatBookmarkList);
    }
  }, [chatBookmarkList]);

  useEffect(() => {
    socket.on(`NEW_BOOKMARK`, (data) => {
      console.log(`받습니다`);
      addBookmark(data);
      console.log(`여기다`, data);
    });
  }, []);

  const onClickHandler = (
    id: string,
    bookmarkName: string,
    content: string
  ) => {
    setChatBookmarkModal(true);
    setChatBookmarkFormData({ id, bookmarkName, content });
  };
  return (
    <div css={styles.chatBookmarkBox}>
      <div>chatBookmark</div>
      <ChatBookmarkModal channelId={channelId} pageId={pageId} />
      <ChatBookmarkForm channelId={channelId} pageId={pageId} />
      <button
        css={styles.chatBookmarkCreateBtn}
        onClick={() => setChatBookmarkFormModal(true)}
      >
        +
      </button>
      <div css={styles.chatBookmarkItemBox}>
        {chatBookmark &&
          chatBookmark.map((bookmark, i) => {
            return (
              <div
                key={i}
                css={styles.chatBookmarkItem}
                onClick={(e) =>
                  onClickHandler(
                    bookmark._id,
                    bookmark.bookmarkName,
                    bookmark.content
                  )
                }
              >
                {bookmark.bookmarkName}
              </div>
            );
          })}
      </div>
    </div>
  );
};
