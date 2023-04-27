import Image from 'next/image';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  messageModalState,
  messageModalImgState,
  messageMoreState,
} from '@/recoil/socket/atom';

import * as styles from './styles';
import type { MessageType } from './type';
import { useEffect, useRef, useLayoutEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const Message = ({
  name,
  content,
  img,
  isDisplay,
  currentMsgTime,
}: MessageType) => {
  const [messageModal, setMessageModal] = useRecoilState(messageModalState);
  const setMessageImgSrc = useSetRecoilState(messageModalImgState);
  const [isMessageMore, setIsMessageMore] = useRecoilState(messageMoreState);
  const messageHeightRef = useRef<HTMLDivElement>(null);
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMessageModal(true);
    setMessageImgSrc(img);
  };

  useEffect(() => {
    if (messageHeightRef.current?.scrollHeight) {
      console.log(`scollheight`, messageHeightRef.current?.scrollHeight);
      if (messageHeightRef.current.scrollHeight > 310) {
        (
          messageHeightRef.current.nextElementSibling as HTMLDivElement
        ).style.display = `block`;
      }
    }
  }, [messageHeightRef.current]);

  const moreMessageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (
      messageHeightRef.current !== null &&
      e.currentTarget.parentElement !== null
    ) {
      isMessageMore ? setIsMessageMore(false) : setIsMessageMore(true);
      if (messageHeightRef.current.style.maxHeight !== `none`) {
        messageHeightRef.current.style.maxHeight = `none`;
      } else {
        messageHeightRef.current.style.maxHeight = `310px`;
      }
    }
  };

  return (
    <div css={styles.messageAlign(isDisplay)}>
      <div css={styles.messageImgBox(isDisplay)}>
        <button css={styles.messageImgBtn(isDisplay)} onClick={onClickHandler}>
          <Image
            css={{
              borderRadius: `50%`,
            }}
            src={img}
            fill
            sizes="40px"
            alt={`userProfileImg`}
          />
        </button>
      </div>
      <div css={styles.messageNameAlign}>
        <div css={styles.messageNameBox}>
          <span css={styles.messageName(isDisplay)}>{name}</span>
          <span css={styles.messageTime(isDisplay)}>{currentMsgTime}</span>
        </div>
        <div css={styles.messageContentBox}>
          <div css={styles.messageContentInnerBox} ref={messageHeightRef}>
            <span css={styles.message}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                children={content}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        // showInlineLineNumbers={true}
                        showLineNumbers
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
            </span>
          </div>
          <div css={styles.messageMoreBox}>
            <span css={styles.messageMoreSpan}>
              {isMessageMore ? '' : '...'}
            </span>
            <button css={styles.messageMoreBtn} onClick={moreMessageHandler}>
              {isMessageMore ? '접기' : '더보기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
//"createdAt": "2023-03-19T16:09:09.401Z",
