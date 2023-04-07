import * as styles from './styles';
import type { MessageType } from './type';

export const Message = ({ userId, name, text }: MessageType) => {
  return (
    <div>
      <div css={styles.message}>
        {/* <div>{userId}</div> */}
        {/* <div>{name}</div> */}
        <span>{text}</span>
      </div>
    </div>
  );
};
