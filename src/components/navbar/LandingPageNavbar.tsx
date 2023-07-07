import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginModal } from '@/components/navbar/LoginModal';
import { loginModalState } from '@/recoil/user/atom';
import { LandingPageNavbarIsScroll } from '@/recoil/project/atom';
import acohaPink from '@/images/channelImg/9.png';
import Image from 'next/image';
import * as styles from './styles';

export const LandingPageNavbar = () => {
  const isScroll = useRecoilValue(LandingPageNavbarIsScroll);
  const setIsLoginModalOpen = useSetRecoilState(loginModalState);
  return (
    <div css={styles.landingPageNavbarBox(isScroll)}>
      <div css={styles.landingPageNavbarImageBox}>
        <div css={styles.landingPageNavbarImageAlign}>
          <Image
            css={styles.landingPageNavbarImage}
            src={acohaPink}
            width={30}
            height={30}
            alt={`LandingPage Navbar Image`}
          />
          <span css={styles.landingPageNavbarImageDesc}>아코하</span>
        </div>
        <div>
          <div css={styles.loginBox}>
            <button
              css={styles.loginBtn}
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Login
            </button>
          </div>
          <LoginModal />
        </div>
      </div>
    </div>
  );
};
