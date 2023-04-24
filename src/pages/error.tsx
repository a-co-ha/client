import Image from 'next/image';
import redImage from '@/images/channelImg/1.png';
import * as styles from '@/components/error-boundary/styles';

const Error = () => {
  return (
    <div css={styles.errorBackground}>
      <div>
        <div>
          <div css={styles.errorImgBox}>
            <Image src={redImage} width={60} height={60} alt={`errorImg`} />
            <h1>error</h1>
          </div>
          <div css={styles.errorMessage}>로그인이 필요한 서비스입니다</div>
        </div>
      </div>
    </div>
  );
};

export default Error;
