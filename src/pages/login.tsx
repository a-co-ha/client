import githubLogo from '@/images/githubLogo.png';
import { getGitHubUrl } from '@/utils/getGithubUrl';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
const flexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function LoginForm() {
  const router = useRouter();
  console.log(router);
  let from = router.pathname;
  // const location = useLocation();
  // let from = ((location.state as any)?.from?.pathname as string) || '/';
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
          <Link
            css={{
              display: 'inline-block',
              width: '200px',
              height: '200px',
            }}
            href={getGitHubUrl()}
          >
            <Image src={githubLogo} alt="githubOAuth" />
          </Link>
        </div>
      </div>
    </div>
  );
}
