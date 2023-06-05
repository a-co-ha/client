import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  chatBookmarkModalState,
  chatBookmarkFormDataState,
  isBookmarkEditingState,
  chatBookmarkEditContentShare,
} from '@/recoil/socket/atom';
import { HelpModal } from '@/hooks/useHelpModal';
import { useDeleteBookmark } from '@/hooks/queries/socket/deleteBookmark';
import { CahtBookmarkEditForm } from './ChatBookmarkEditForm';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import * as styles from './styles';
import bookmark from '@/images/helpImg/bookmark.png';

export const ChatBookmarkModal = ({
  channelId,
  pageId,
}: {
  channelId: string;
  pageId: string;
}) => {
  const chatBookmarkData = useRecoilValue(chatBookmarkFormDataState);
  const deleteBookmark = useDeleteBookmark(
    channelId,
    pageId,
    chatBookmarkData.id
  );
  const [isBookmarkEditing, setIsBookmarkEditing] = useRecoilState(
    isBookmarkEditingState
  );

  const [ChatBookmarkEditContentShare, setChatBookmarkEditContentShare] =
    useRecoilState(chatBookmarkEditContentShare(chatBookmarkData.id));

  const [chatBookmarkModal, setChatBookmarkModal] = useRecoilState(
    chatBookmarkModalState
  );

  const [isCopied, setIsCopied] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    setChatBookmarkEditContentShare({
      id: '',
      chatBookmarkTitle: chatBookmarkData.bookmarkName,
      chatBookmarkContent: chatBookmarkData.content,
    });
    modalRef.current && (modalRef.current as HTMLDivElement).focus();
  }, [chatBookmarkData]);

  const onClickHandler = () => {
    setChatBookmarkModal(false);
    setIsBookmarkEditing(false);
    setIsCopied(false);
  };
  const codeCopyHandler = async (contents: string) => {
    await navigator.clipboard.writeText(contents);
    setIsCopied(true);
  };

  const bookmarkEditHandler = () => {
    setIsBookmarkEditing(true);
  };
  const bookmarkDeleteHandler = () => {
    deleteBookmark.mutate();
    setChatBookmarkModal(false);
  };

  const onkeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === `Escape`) {
      e.preventDefault();
      setChatBookmarkModal(false);
    }
  };
  return (
    <div ref={modalRef} onKeyDown={onkeyDownHandler} tabIndex={0}>
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
                  {ChatBookmarkEditContentShare.chatBookmarkTitle}
                </h2>
                <HelpModal
                  content={`수정과 삭제, copy 버튼으로 간편하게 내용을 복사할 수 있답니다. \n내 코드를 공유하고 싶으시다구요? 물론 가능합니다!`}
                  image={bookmark.src}
                  direction={`left`}
                />
              </div>
              <div css={styles.chatBookmarkModalContent}>
                {/* editing */}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  children={ChatBookmarkEditContentShare.chatBookmarkContent}
                  linkTarget={`_blank`}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          {...props}
                          children={String(children).replace(/\n$/, '')}
                          language={match[1]}
                          showLineNumbers
                          PreTag="div"
                          style={oneLight}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                />
              </div>
              <div css={styles.chatBookmarkBtnBox}>
                <button
                  css={styles.chatBookmarkCopyBtn(isCopied)}
                  onClick={() =>
                    codeCopyHandler(
                      ChatBookmarkEditContentShare.chatBookmarkContent
                    )
                  }
                >
                  {isCopied ? `Copied ✔️` : `Copy`}
                </button>
                <div>
                  <button
                    css={styles.chatBookmarkModalEditBtn(isBookmarkEditing)}
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
              </div>
            </div>
          ) : (
            <CahtBookmarkEditForm
              channelId={channelId}
              pageId={pageId}
              id={chatBookmarkData.id}
              bookmarkDeleteHandler={bookmarkDeleteHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
};
