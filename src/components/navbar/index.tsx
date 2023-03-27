import { LoginBtn } from './LoginBtn';
import { Profile } from './Profile';
import { Title } from './Title';
import { UserList } from './UserList';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { initialUserState } from '@/recoil/user/atom';
import { Loading } from '../loading/Loading';
import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from '../error-boundary';
import { Error } from '../error-boundary/Error';
import * as styles from './styles';

export const NavBar = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={Error} onReset={reset}>
          {/* <Suspense fallback={<Loading />}> */}
          <div css={styles.navBar}>
            <Profile />
            <Title />
            <LoginBtn />
          </div>
          {/* </Suspense> */}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
