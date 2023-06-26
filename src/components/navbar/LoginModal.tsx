import { useRecoilState } from 'recoil';
import { loginModalState } from '@/recoil/user/atom';
import Image from 'next/image';
import Link from 'next/link';
import acohaGreen from '@/images/channelImg/6.png';
import * as styles from './styles';

export const LoginModal = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(loginModalState);

  const onClickHandler = () => {
    setIsLoginModalOpen(false);
  };
  return (
    <div css={styles.loginModalBox(isLoginModalOpen)}>
      <div
        onClick={onClickHandler}
        css={styles.loginModalBackground(isLoginModalOpen)}
      ></div>
      <div css={styles.loginModalTransition(isLoginModalOpen)}>
        <div css={styles.loginModal}>
          <h3>A ~ Co Ha!</h3>
          <h4>아코하</h4>
          <Image src={acohaGreen} css={styles.loginLogo} alt="loginLogo" />
          <p css={styles.loginModalDesc}>
            아코하는 깃허브 계정으로 간편 로그인을 지원해요
            <br></br> 바로 시작해 볼까요?
          </p>
          <div css={styles.loginModalBtnBox}>
            <Link
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 no-underline text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              href={`${
                process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
                  ? process.env.NEXT_PUBLIC_DEV_OAUTH_URL
                  : process.env.NEXT_PUBLIC_OAUTH_URL
              }`}
              onClick={() => setIsLoginModalOpen(false)}
            >
              Github 로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
