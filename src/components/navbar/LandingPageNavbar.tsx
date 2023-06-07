import { useState } from 'react';
import { LoginBtn } from './LoginBtn';
import { useRecoilValue } from 'recoil';
import { LandingPageNavbarIsScroll } from '@/recoil/project/atom';
import acohaPink from '@/images/channelImg/9.png';
import Image from 'next/image';
import * as styles from './styles';
import { useEffect } from 'react';

export const LandingPageNavbar = () => {
  const isScroll = useRecoilValue(LandingPageNavbarIsScroll);
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
        <LoginBtn />
      </div>
    </div>
  );
};
