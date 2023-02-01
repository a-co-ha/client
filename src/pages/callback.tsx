import githubLogo from '@/images/githubLogo.png';
import { getGitHubUrl } from '@/utils/getGithubUrl';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { getGithubOathToken } from '@/utils/service';
const flexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function LoginForm() {
  const router = useRouter();
  const code: any = router.query['code'];
  console.log(code);

  const getToken = async () => {
    const token = await getGithubOathToken(code);
    console.log(token);
  };

  useEffect(() => {
    if (code) getToken();
  }, [code]);

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
          <p>성공적 로그인</p>
        </div>
      </div>
    </div>
  );
}
