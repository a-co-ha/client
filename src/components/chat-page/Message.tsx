import * as styles from './styles';
import type { MessageType } from './type';

export const Message = ({ userId, name, text }: MessageType) => {
  return (
    <div>
      <div css={styles.messageBox}>
        {/* <div>{userId}</div> */}
        {/* <div>{name}</div> */}
        <div>{text}</div>
      </div>
    </div>
  );
};
