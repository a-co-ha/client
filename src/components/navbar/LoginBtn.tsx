import Image from 'next/image';
import githubLogo from '@/images/githubLogo.png';

export const LoginBtn = () => {
  return (
    <>
      <div css={{ width: '200px', height: '50px', padding: '5px 10px' }}>
        <div css={{ display: 'flex' }}>
          <Image src={githubLogo} alt="loginLogo" />
          <span>로그인 버튼</span>
        </div>
      </div>
    </>
  );
};
