import * as styles from './styles';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useResetRecoilState } from 'recoil';
import { loginState } from '@/recoil/user/atom';
import { channelNameState } from '@/recoil/project/atom';
import { api } from '@/pages/api/config/api-config';
import { SocketContext } from '../chat-page/SocketContextProvider';
import { useContext } from 'react';
import Image from 'next/image';

export const Profile = () => {
  // const { logout } = useContext(SocketContext);
  const router = useRouter();
  const { data: user } = useGetUser();
  const resetProfile = useResetRecoilState(loginState);
  const resetChannelName = useResetRecoilState(channelNameState);
  const onClickHandler = async () => {
      const sessionId = getCookie(`sessionId`);
    // const sidCookie = getCookie(`sidCookie`);
    console.log(`session`, sessionId);
    // deleteCookie(`refreshToken`);
    // deleteCookie(`accessToken`);
    // deleteCookie(`sessionId`);
    // deleteCookie(`myUserId`);
    // deleteCookie(`sidCookie`);
    resetProfile();
    resetChannelName();
    await api.post(`/api/user/logout`,{
      sessionID : sessionId
    });
    // logout();

    router.replace(`/`);
  };

  console.log(user);
  return (
    <div css={styles.profileBox}>
      {user && (
        <div css={styles.profileInnerBox}>
          <div css={styles.profileImageBox}>
            <Image src={user.img} alt="" width={100} height={100} />{' '}
          </div>
          <button css={{ fontSize: '12px' }}>{user.name}</button>
          <button css={{ marginLeft: '4px' }} onClick={onClickHandler}>
            🚪
          </button>
        </div>
      )}
    </div>
  );
};
