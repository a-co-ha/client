import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { messageModalState } from '@/recoil/socket/atom';
import githubChannelImg from '@/images/github_channel.png';
import * as styles from './styles';
import type { MessageType } from './type';

export const Message = ({
  userId,
  name,
  text,
  isDisplay,
  currentMsgTime,
}: MessageType) => {
  const myUserId = Number(getCookie(`myUserId`));
  // const isMyMessage = userId === myUserId ? true : false;
  const [messageModal, setMessageModal] = useRecoilState(messageModalState);

  const onClickHandler = () => {
    setMessageModal(true);
  };

  return (
    <div css={styles.messageAlign(isDisplay)}>
      <div css={styles.messageImgBox(isDisplay)}>
        <button
          css={{
            position: `relative`,
            width: `100%`,
            height: `100%`,
          }}
          onClick={onClickHandler}
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
