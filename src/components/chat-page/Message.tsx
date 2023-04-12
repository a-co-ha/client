import { getCookie } from 'cookies-next';
import Image from 'next/image';
import * as styles from './styles';
import type { MessageType } from './type';
import githubChannelImg from '@/images/github_channel.png';

export const Message = ({
  userId,
  name,
  text,
  isDisplay,
  currentMsgTime,
}: MessageType) => {
  const myUserId = Number(getCookie(`myUserId`));
  const isMyMessage = userId === myUserId ? true : false;

  return (
    <div css={styles.messageAlign(isMyMessage)}>
      <div css={styles.messageImgBox(isMyMessage, isDisplay)}>
        <button
          css={{
            position: `relative`,
            width: `100%`,
            height: `100%`,
          }}
        >
          <Image
            css={{
              borderRadius: `50%`,
            }}
            src={githubChannelImg}
            fill
            alt={`channelImg`}
          />
        </button>
      </div>
      <div css={styles.messageNameAlign}>
        <div css={styles.messageNameBox(isMyMessage)}>
          <span css={styles.messageName(isMyMessage, isDisplay)}>{name}</span>
          <span css={styles.messageTime(isDisplay)}>{currentMsgTime}</span>
        </div>
        <div css={styles.message(isMyMessage)}>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};
//"createdAt": "2023-03-19T16:09:09.401Z",
