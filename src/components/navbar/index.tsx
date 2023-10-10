import {
  channelMobileRightSidebarOpenState,
  channelSidebarOpenState,
} from '@/recoil/project/atom';
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ErrorBoundary } from '../error-boundary';
import { Error } from '../error-boundary/Error';
import { LoginBtn } from './LoginBtn';
import { ProjectMenu } from './ProjectMenu';
import * as styles from './styles';
import { Title } from './Title';

export const NavBar = () => {
  const [isChannelSidebarOpen, setIsChannelSidebarOpen] = useRecoilState(
    channelSidebarOpenState
  );
  const setIsChannelRightSidebarOpen = useSetRecoilState(
    channelMobileRightSidebarOpenState
  );

  const onClickHandler = () => {
    if (isChannelSidebarOpen) {
      setIsChannelSidebarOpen(false);
    } else {
      setIsChannelRightSidebarOpen(false);
      setIsChannelSidebarOpen(true);
    }
  };

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={Error} onReset={reset}>
          <div css={styles.navBar}>
            <div
              css={styles.navBarBackIconBox(isChannelSidebarOpen)}
              onClick={onClickHandler}
            >
              <ArrowSmallLeftIcon />
            </div>
            <ProjectMenu />
            <Title />
            <LoginBtn />
          </div>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
