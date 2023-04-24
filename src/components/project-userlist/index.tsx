import { SocketContext } from '../chat-page/SocketContextProvider';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { onUserState } from '@/recoil/socket/atom';
import { useGetUsers } from '@/hooks/queries/user/getUsers';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import * as styles from './styles';
import type { ChannelUser } from '@/pages/api/user/type';
import { getUsers } from '@/pages/api/user/getUsers';

export const UserList = () => {
  const { data: channelUsers } = useGetUsers();
  const [onUser, setOnUser] = useRecoilState(onUserState);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.on(`NEW_MEMBER`, (user) => {
      setOnUser((prev) => {
        const newOnUsers = prev.concat([user]);
        return newOnUsers;
      });
    });
  }, []);

  return (
    <div css={styles.userListBox}>
      <div css={styles.userListInnerBox}>
        {channelUsers &&
          channelUsers.map((member: ChannelUser, i: number) => {
            const isOnUser = onUser.some(
              (user) => user.userID === member.userId
            );
            const isAdmin = member.admin;
            return (
              <div key={i}>
                {/* <Image src={user.img} width={40} height={40} alt={`onUserList`} /> */}
                <span css={styles.isUserOnline(isOnUser, isAdmin)}></span>
                <span css={styles.userName}>{member.name}</span>
                <span css={styles.adminCrown(isAdmin)}>
                  <FontAwesomeIcon
                    icon={faCrown}
                    style={{ color: '#ffbb00' }}
                  />
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

//  MEMBER - 처음 연결시 한 번. 이거와 채널에 속한 유저api 비교,
// NEW_MEMBER - 오프 -> 온라인 시마다
// DISCONNECT_MEMEBER 끊긴 유저
// 결론 : api로 우리 채널 유저 목록 표시 ->
//
