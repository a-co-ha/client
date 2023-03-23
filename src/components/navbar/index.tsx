import { LoginBtn } from './LoginBtn';
import { Profile } from './Profile';
import { Title } from './Title';
import * as styles from './styles';

export const NavBar = () => {
  return (
    <div css={styles.navBar}>
      <Profile />
      <Title />
      <LoginBtn />
    </div>
  );
};
