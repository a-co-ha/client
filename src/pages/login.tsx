import githubLogo from '@/images/githubLogo.png';
// import { css } from '@emotion/react';
import Image from 'next/image';

const flexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
export default function LoginForm() {
  return (
    <div
      css={{
        ...flexCenter,
        height: '100%',
      }}
    >
      <div
        css={{
          ...flexCenter,
          width: '500px',
          height: '350px',
          textAlign: 'center',
          borderRadius: '4px',
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
      >
        <div>
          <h1 css={{ fontSize: '2rem' }}>a~coha</h1>
          <form action="">
            <button
              css={{
                display: 'inline-block',
                width: '200px',
                height: '200px',
              }}
            >
              <Image src={githubLogo} alt="githubOAuth" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
