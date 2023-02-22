import { LoginBtn } from './LoginBtn';
import { Profile } from './Profile';
import { Title } from './Title';

export const NavBar = () => {
  return (
    <>
      <div css={{ display: 'flex', width: '100%', height: '100px' }}>
        <Profile />
        <Title />
        <LoginBtn />
      </div>
    </>
  );
};
