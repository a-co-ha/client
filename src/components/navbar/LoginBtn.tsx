import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState, loginModalState } from '@/recoil/user/atom';
import { Profile } from './Profile';
import { getCookie } from 'cookies-next';
import { LoginModal } from '@/components/navbar/LoginModal';
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
              <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                로그인
              </button>
            </div>
          </div>
          <LoginModal />
        </div>
      )}
    </>
  );
};
