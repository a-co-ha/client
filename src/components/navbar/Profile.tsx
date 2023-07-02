import { useGetUser } from '@/hooks/queries/user/getUser';
import { api } from '@/pages/api/config/api-config';
import {
  channelMobileRightSidebarOpenState,
  channelNameState,
} from '@/recoil/project/atom';
import { loginState } from '@/recoil/user/atom';
import { Bars3Icon, XCircleIcon } from '@heroicons/react/20/solid';
import { deleteCookie, getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useResetRecoilState } from 'recoil';
import { loginState } from '@/recoil/user/atom';
import { channelNameState } from '@/recoil/project/atom';
import { api } from '@/pages/api/config/api-config';
import { AlertValue, SocketContext } from '../chat-page/SocketContextProvider';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Alert } from './Alert';
import { Menu } from '@headlessui/react';
import { useContext } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { SocketContext } from '../chat-page/SocketContextProvider';
import * as styles from './styles';

export const Profile = () => {
  const { socketDisconnect } = useContext(SocketContext);
  const router = useRouter();
  const { data: user } = useGetUser();
  const resetProfile = useResetRecoilState(loginState);
  const [isChannelRightSidebarOpen, setIsChannelRightSidebarOpen] =
    useRecoilState(channelMobileRightSidebarOpenState);

  const { socket, getAlert, alertSocket } = useContext(SocketContext);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [alertList, setAlertList] = useState<AlertValue[]>([]);

  useEffect(() => {
    alertSocket(setIsAlert, setAlertList);
    getAlert(setIsAlert);
  }, [socket]);

  const rightSidebarClickHandler = () => {
    isChannelRightSidebarOpen
      ? setIsChannelRightSidebarOpen(false)
      : setIsChannelRightSidebarOpen(true);
  };

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
    router.replace(`/`);
  };
  return (
    <div css={styles.profileBox}>
      {user && (
        <div css={styles.profileInnerBox}>
          <Menu as="div" className="relative">
            <Menu.Button>
              <div
                css={styles.navBarRightSidebarIconBox(
                  isChannelRightSidebarOpen
                )}
                onClick={rightSidebarClickHandler}
              >
                <Bars3Icon />
              </div>
              <div
                css={styles.profileImageBox(isAlert)}
                onClick={() => {
                  socket.emit('READ_ALERT');
                }}
              >
                <Image src={user.img} alt="" width={100} height={100} />
              </div>
            </Menu.Button>
            <Alert alertList={alertList} />
          </Menu>
          <button css={{ fontSize: '12px', marginRight: `auto` }}>
            {user.name}
          </button>
          <button css={styles.profileLogoutBtn} onClick={onClickHandler}>
            <XCircleIcon />
          </button>
        </div>
      )}
    </div>
  );
};
