import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { messageModalState, messageModalImgState } from '@/recoil/socket/atom';

import * as styles from './styles';
import type { MessageType } from './type';
import { useEffect, useRef } from 'react';

export const Message = ({
  name,
  content,
  img,
  isDisplay,
  currentMsgTime,
}: MessageType) => {
  const myUserId = Number(getCookie(`myUserId`));
  // const isMyMessage = userId === myUserId ? true : false;
  const [messageModal, setMessageModal] = useRecoilState(messageModalState);
  const setMessageImgSrc = useSetRecoilState(messageModalImgState);
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMessageModal(true);
    setMessageImgSrc(img);
  };
  const messageHeightRef = useRef<HTMLDivElement>(null);
  const target = messageHeightRef.current;

  useEffect(() => {
    if (target?.scrollHeight) {
      console.log(`scollheight`, messageHeightRef.current?.scrollHeight);
      if (target.scrollHeight > 545 && target.nextElementSibling) {
        (
          target.nextElementSibling as HTMLButtonElement
        ).style.display = `block`;
      }
    }
  }, [messageHeightRef.current]);
  const moreMessageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (target !== null && e.currentTarget.parentElement !== null) {
      target.style.maxHeight = `none`;
      // (target.nextElementSibling as HTMLButtonElement).style.display = `none`;
      // e.currentTarget.parentElement.style.display = `none`;
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
            <span css={styles.message}>{content}</span>
          </div>
          <div css={{ textAlign: 'center', userSelect: `none` }}>
            <span css={styles.messageMoreSpan}>...</span>
            <button css={styles.messageMoreBtn} onClick={moreMessageHandler}>
              더보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
//"createdAt": "2023-03-19T16:09:09.401Z",
