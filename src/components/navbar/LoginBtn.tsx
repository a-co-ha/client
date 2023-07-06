import { LoginModal } from '@/components/navbar/LoginModal';
import { loginModalState, loginState } from '@/recoil/user/atom';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Profile } from './Profile';
import * as styles from './styles';

export const LoginBtn = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(loginModalState);

  const openModal = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <Profile />
      ) : (
        <div>
          <div>
            <div css={styles.loginBox}>
              <button css={styles.loginBtn} type="button" onClick={openModal}>
                Login
              </button>
            </div>
          </div>
          <LoginModal />
        </div>
      )}
    </>
  );
};
