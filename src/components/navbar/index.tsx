import { LoginBtn } from './LoginBtn';
import { Title } from './Title';
import { ProjectMenu } from './ProjectMenu';
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
            <ProjectMenu />
            <Title />
            <LoginBtn />
          </div>
          {/* </Suspense> */}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
