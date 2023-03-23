import * as styles from './styles';
import { userDataState } from '@/recoil/user/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from '@/recoil/user/atom';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';

export const Profile = () => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const isLoggedIn = useRecoilValue(loginState);
  if (isLoggedIn) {
    const { data: user, isLoading } = useGetUser();
    if (user !== undefined) {
      setUserData(user);
    }
  }
  return (
    <div css={styles.profileBox}>
      <div>
        {isLoggedIn ? (
          <div>
            <button>{userData.img}</button>
            <span>{userData.name}</span>
          </div>
        ) : (
          <div>
            <button>{3}</button>
            <span>{4}</span>
          </div>
        )}
      </div>
    </div>
  );
};
