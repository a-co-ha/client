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
  console.log(`이즈로그드이이인`, isLoggedIn);
  useEffect(() => {
    const token = getCookie(`accessToken`);
    console.log(`로그인 버튼 토큰!@`, token);
    // token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

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
