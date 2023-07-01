import * as styles from './styles';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useResetRecoilState } from 'recoil';
import { loginState } from '@/recoil/user/atom';
import { channelNameState } from '@/recoil/project/atom';
import { api } from '@/pages/api/config/api-config';
import { SocketContext } from '../chat-page/SocketContextProvider';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Menu } from '@headlessui/react';
import { Alert } from './Alert';

export const Profile = () => {
  const { socketDisconnect } = useContext(SocketContext);
  const router = useRouter();
  const { data: user } = useGetUser();
  const resetProfile = useResetRecoilState(loginState);
  const resetChannelName = useResetRecoilState(channelNameState);
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = async () => {
    const sessionID = getCookie(`sessionId`);
    console.log(`session`, sessionID);
    await api.post(`/api/user/logout`, {
      sessionID,
    });
    socketDisconnect();
    deleteCookie(`refreshToken`);
    deleteCookie(`accessToken`);
    deleteCookie(`sessionId`);
    deleteCookie(`myUserId`);
    deleteCookie(`myUserName`);
    resetProfile();
    resetChannelName();
    router.replace(`/`);
  };
  return (
    <div css={styles.profileBox}>
      {user && (
        <div css={styles.profileInnerBox}>
          <div
            css={styles.profileImageBox}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <Image src={user.img} alt="" width={100} height={100} />{' '}
            {isOpen && <Alert />}
          </div>

          <button css={{ fontSize: '12px', marginRight: `auto` }}>
            {user.name}
          </button>
          <button
            css={{ marginLeft: '4px', width: '20px' }}
            onClick={onClickHandler}
          >
            <FontAwesomeIcon icon={faDoorOpen} />
          </button>
        </div>
      )}
    </div>
  );
};
