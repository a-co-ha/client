import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  chatBookmarkModalState,
  chatBookmarkFormDataState,
} from '@/recoil/socket/atom';
import { usePatchBookmark } from '@/hooks/queries/socket/patchBookmark';
import * as styles from './styles';

export const ChatBookmarkModal = ({
  channelId,
  pageId,
}: {
  channelId: string;
  pageId: string;
}) => {
  const patchBookmark = usePatchBookmark(channelId, pageId);
  const chatBookmarkData = useRecoilValue(chatBookmarkFormDataState);
  const [chatBookmarkModal, setChatBookmarkModal] = useRecoilState(
    chatBookmarkModalState
  );
  const [isCopied, setIsCopied] = useState(false);
  const onClickHandler = () => {
    setChatBookmarkModal(false);
    setIsCopied(false);
  };
  const codeCopyHandler = (contents: string) => {
    navigator.clipboard.writeText(contents);
    setIsCopied(true);
  };

  const bookmarkEditHandler = () => {};
  const bookmarkDeleteHandler = () => {};

  return (
    <div>
      <div
        onClick={onClickHandler}
        css={styles.chatBookmarkModalBackground(chatBookmarkModal)}
      ></div>

      <div css={styles.chatBookmarkModalTransition(chatBookmarkModal)}>
        <div css={styles.chatBookmarkModalBox}>
          <div css={styles.chatBookmarkModalTitleBox}>
            <h2 css={styles.chatBookmarkModalTitle}>
              {chatBookmarkData.bookmarkName}
            </h2>
            <button
              css={styles.chatBookmarkModalEditBtn}
              onClick={bookmarkEditHandler}
            >
              Edit
            </button>
            <button
              css={styles.chatBookmarkModalDeleteBtn}
              onClick={bookmarkDeleteHandler}
            >
              Delete
            </button>
          </div>
          <div css={styles.chatBookmarkModalContent}>
            {chatBookmarkData.content}
          </div>
          <button
            css={styles.chatBookmarkCopyBtn(isCopied)}
            onClick={() => codeCopyHandler(chatBookmarkData.content)}
          >
            {isCopied ? `Copied ✔️` : `Copy`}
          </button>
        </div>
      </div>
    </div>
  );
};
