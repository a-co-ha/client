import { useState, useEffect, useLayoutEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  chatBookmarkModalState,
  chatBookmarkFormDataState,
  isBookmarkEditingState,
  chatBookmarkEditContentShare,
} from '@/recoil/socket/atom';
import { usePatchBookmark } from '@/hooks/queries/socket/patchBookmark';
import { useDeleteBookmark } from '@/hooks/queries/socket/deleteBookmark';
import { CahtBookmarkEditForm } from './ChatBookmarkEditForm';
import * as styles from './styles';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import remarkGfm from 'remark-gfm';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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

  useEffect(() => {
    setChatBookmarkEditContentShare({
      id: '',
      chatBookmarkTitle: chatBookmarkData.bookmarkName,
      chatBookmarkContent: chatBookmarkData.content,
    });
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
                  {ChatBookmarkEditContentShare.chatBookmarkTitle}
                </h2>
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
              <div css={styles.chatBookmarkModalContent}>
                {/* editing */}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  children={ChatBookmarkEditContentShare.chatBookmarkContent}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          language={match[1]}
                          showLineNumbers
                          PreTag="div"
                          {...props}
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
