import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  chatBookmarkModalState,
  chatBookmarkFormDataState,
} from '@/recoil/socket/atom';
import * as styles from './styles';

export const ChatBookmarkModal = () => {
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
  return (
    <div>
      <div
        onClick={onClickHandler}
        css={styles.chatBookmarkModalBackground(chatBookmarkModal)}
      ></div>

      <div css={styles.chatBookmarkModalTransition(chatBookmarkModal)}>
        <div css={styles.chatBookmarkModalBox}>
          <h2 css={styles.chatBookmarkModalTitle}>
            {chatBookmarkData.bookmarkName}
          </h2>
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
