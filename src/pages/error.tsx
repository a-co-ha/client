import Image from 'next/image';
import redImage from '@/images/channelImg/1.png';
import { loginState } from '@/recoil/user/atom';
import { useResetRecoilState } from 'recoil';
import * as styles from '@/components/error-boundary/styles';
import { useEffect } from 'react';

const Error = () => {
  const resetLoginState = useResetRecoilState(loginState);
  useEffect(() => {
    resetLoginState();
  }, []);

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
