import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { chatBookmarkModalState } from '@/recoil/socket/atom';
import * as styles from './styles';

export const ChatBookmarkModal = () => {
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
          <h2>title</h2>
          <div>content</div>
          <button
            css={styles.chatBookmarkCopyBtn(isCopied)}
            onClick={() => codeCopyHandler('contents')}
          >
            {isCopied ? `Copied ✔️` : `Copy`}
          </button>
        </div>
      </div>
    </div>
  );
};
