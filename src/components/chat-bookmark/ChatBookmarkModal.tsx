import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  chatBookmarkModalState,
  chatBookmarkFormDataState,
  isBookmarkEditingState,
} from '@/recoil/socket/atom';
import { usePatchBookmark } from '@/hooks/queries/socket/patchBookmark';
import { CahtBookmarkEditForm } from './ChatBookmarkEditForm';
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
  const [isBookmarkEditing, setIsBookmarkEditing] = useRecoilState(
    isBookmarkEditingState
  );
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

  const bookmarkEditHandler = () => {
    setIsBookmarkEditing(true);
  };
  const bookmarkDeleteHandler = () => {};

  return (
    <div>
      <div
        onClick={onClickHandler}
        css={styles.chatBookmarkModalBackground(chatBookmarkModal)}
      ></div>

      <div css={styles.chatBookmarkModalTransition(chatBookmarkModal)}>
        <div css={styles.chatBookmarkModalBox}>
          {!isBookmarkEditing ? (
            <div>
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
                {/* editing */}
                {chatBookmarkData.content}
              </div>
              <button
                css={styles.chatBookmarkCopyBtn(isCopied)}
                onClick={() => codeCopyHandler(chatBookmarkData.content)}
              >
                {isCopied ? `Copied ✔️` : `Copy`}
              </button>
            </div>
          ) : (
            <CahtBookmarkEditForm channelId={channelId} pageId={pageId} />
          )}
        </div>
      </div>
    </div>
  );
};
