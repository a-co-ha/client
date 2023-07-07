import { useRouter } from 'next/router';
import { NavBar } from '../navbar';
import { LandingPageNavbar } from '../navbar/LandingPageNavbar';

interface Props {
  children?: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const router = useRouter();
  const currentUrl = router.pathname;

  return (
    <div>
      {currentUrl === '/' ? <LandingPageNavbar /> : <NavBar />}

      {children}
    </div>
  );
};
