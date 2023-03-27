import { LoginBtn } from './LoginBtn';
import { Profile } from './Profile';
import { Title } from './Title';
import { UserList } from './UserList';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { initialUserState } from '@/recoil/user/atom';
import * as styles from './styles';

export const NavBar = () => {
  return (
    <div css={styles.navBar}>
      <Profile />
      <Title />
      <LoginBtn />;
    </div>
  );
};
