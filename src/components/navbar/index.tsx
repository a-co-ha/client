import { LoginBtn } from './LoginBtn';
import { Profile } from './Profile';
import { Title } from './Title';
import { UserList } from './UserList';
import * as styles from './styles';
import { useRecoilValue } from 'recoil';
import { loginState } from '@/recoil/user/atom';

export const NavBar = () => {
  const isLoggedIn = useRecoilValue(loginState);
  return (
    <div css={styles.navBar}>
      <Profile />
      <Title />
      {!isLoggedIn ? <LoginBtn /> : <UserList />}
    </div>
  );
};
