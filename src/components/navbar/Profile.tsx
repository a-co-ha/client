import * as styles from './styles';
import { userDataState } from '@/recoil/user/atom';
import { useRecoilState } from 'recoil';
import { loginState } from '@/recoil/user/atom';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { useEffect } from 'react';
import Image from 'next/image';
import { getCookie } from 'cookies-next';

export const Profile = () => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const { data: user } = useGetUser();
  useEffect(() => {
    if (isLoggedIn) {
      if (user !== undefined) {
        setUserData(user);
      }
    }
    const token = getCookie('accessToken');
    token ? setIsLoggedIn(true) : null;
  }, []);
  console.log(`profile 유저데이타@!@`, userData);
  return (
    <div css={styles.profileBox}>
      <div>
        {/* {isLoggedIn ? ( */}
        <div>
          {user ? (
            <div>
              <button>{userData.name}</button>
              <Image src={userData.img} alt="" width={100} height={100} />{' '}
            </div>
          ) : null}
        </div>
        {/* ) : ( */}
        {/* <div>
            <button>{3}</button>
            <span>{4}</span>
          </div>
        )}
      </div> */}
      </div>
    </div>
  );
};
