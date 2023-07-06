import { useGetBookmarks } from '@/hooks/queries/socket/getBookmarks';
import { channelMobileRightSidebarOpenState } from '@/recoil/project/atom';
import {
  chatBookmarkFormDataState,
  chatBookmarkFormModalState,
  chatBookmarkModalState,
  chatBookmarkState,
} from '@/recoil/socket/atom';
import { useCallback, useContext, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { SocketContext } from '../chat-page/SocketContextProvider';
import { ChatBookmarkForm } from './ChatBookmarkForm';
import { ChatBookmarkModal } from './ChatBookmarkModal';
import * as styles from './styles';

export const ChatBookmark = ({
  channelId,
  pageId,
}: {
  channelId: string;
  pageId: string;
}) => {
  const { data: chatBookmarkList, refetch } = useGetBookmarks(pageId);
  const [chatBookmark, setChatBookmark] = useRecoilState(chatBookmarkState);
  const setChatBookmarkModal = useSetRecoilState(chatBookmarkModalState);
  const setChatBookmarkFormData = useSetRecoilState(chatBookmarkFormDataState);
  const setChatBookmarkFormModal = useSetRecoilState(
    chatBookmarkFormModalState
  );
  const isChannelRightSidebarOpen = useRecoilValue(
    channelMobileRightSidebarOpenState
  );

  const { newBookmark } = useContext(SocketContext);

  const addBookmark = useCallback((bookmark: any) => {
    setChatBookmark((prev) => {
      const newBookmark = prev.concat([bookmark]);
      console.log(`newBook`, newBookmark);
      return newBookmark;
    });
  }, []);
  useEffect(() => {
    if (chatBookmarkList !== undefined) {
      setChatBookmark(chatBookmarkList.bookmarkList);
      console.log(chatBookmarkList);
    }
  }, [chatBookmarkList]);

  useEffect(() => {
    console.log(`받습니다`);
    newBookmark(addBookmark);
    refetch();
  }, [newBookmark]);

  const onClickHandler = (
    id: string,
    bookmarkName: string,
    content: string
  ) => {
    setChatBookmarkModal(true);
    setChatBookmarkFormData({ id, bookmarkName, content });
  };

  const onkeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === `Escape`) {
      e.preventDefault();
      setChatBookmarkModal(false);
    }
  };
  return (
    <div css={styles.chatBookmarkBox(isChannelRightSidebarOpen)}>
      <ChatBookmarkModal channelId={channelId} pageId={pageId} />
      <ChatBookmarkForm channelId={channelId} pageId={pageId} />
      <button
        css={styles.chatBookmarkCreateBtn}
        onClick={() => setChatBookmarkFormModal(true)}
      >
        북마크 +
      </button>
      <div css={styles.chatBookmarkScrollBox}>
        <div css={styles.chatBookmarkItemBox}>
          {chatBookmark.map((bookmark, i) => {
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
    </div>
  );
};
