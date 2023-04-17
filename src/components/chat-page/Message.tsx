import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { messageModalState, messageModalImgState } from '@/recoil/socket/atom';

import * as styles from './styles';
import type { MessageType } from './type';

export const Message = ({
  name,
  text,
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
        <div css={styles.message}>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};
//"createdAt": "2023-03-19T16:09:09.401Z",
