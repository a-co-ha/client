import { LoginBtn } from './LoginBtn';
import { Profile } from './Profile';
import { Title } from './Title';
import { ProjectMenu } from './ProjectMenu';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  channelSidebarOpenState,
  channelMobileRightSidebarOpenState,
} from '@/recoil/project/atom';
import { initialUserState } from '@/recoil/user/atom';
import { Loading } from '../loading/Loading';
import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from '../error-boundary';
import { Error } from '../error-boundary/Error';
import * as styles from './styles';
import { Alert } from './Alert';
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid';

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
          {/* <Suspense fallback={<Loading />}> */}
          <div css={styles.navBar}>
            <div
              css={styles.navBarBackIconBox(isChannelSidebarOpen)}
              onClick={onClickHandler}
            >
              <ArrowSmallLeftIcon />
            </div>

            <ProjectMenu />
            <Title />
            <Alert />
            <LoginBtn />
          </div>
          {/* </Suspense> */}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
