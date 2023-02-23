import * as styles from './styles';
import Image from 'next/image';
import githubLogo from '@/images/githubLogo.png';

export const LoginBtn = () => {
  return (
    <div css={styles.loginBox}>
      <div css={styles.loginBox}>
        <Image src={githubLogo} css={styles.loginLogo} alt="loginLogo" />
        <span>로그인 버튼</span>
      </div>
    </div>
  );
};
