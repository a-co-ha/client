import { useGetUsers } from '@/hooks/queries/user/getUsers';
import type { ChannelUser } from '@/pages/api/user/type';
import { channelMobileRightSidebarOpenState } from '@/recoil/project/atom';
import { onUserState } from '@/recoil/socket/atom';
import { channelUserModalState, channelUserState } from '@/recoil/user/atom';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SocketContext } from '../chat-page/SocketContextProvider';
import * as styles from './styles';
import { UserModal } from './UserModal';

export const UserList = () => {
  const { data: channelUsersData } = useGetUsers();
  const [onUser, setOnUser] = useRecoilState(onUserState);
  const [channelUsers, setChannelUsers] = useRecoilState(channelUserState);
  const [isUserModalOpen, setIsUserModalOpen] = useRecoilState(
    channelUserModalState(1)
  );
  const isChannelRightSidebarOpen = useRecoilValue(
    channelMobileRightSidebarOpenState
  );
  const { newMember, disconnectMember } = useContext(SocketContext);

  const addMember = (member: any) => {
    setOnUser((prev) => {
      console.log(`prev`, prev);
      const newMember = prev.concat([member]);
      console.log(`newMember`, newMember);
      return newMember;
    });
  };

  const deleteMember = (member: any) => {
    setOnUser((prev: any) => {
      const newOnUsers = prev.filter(
        (prevUser: any) => prevUser.userID !== member.userID
      );
      console.log(`deleteMember`, newOnUsers);
      return newOnUsers;
    });
  };

  useEffect(() => {
    if (channelUsersData !== undefined) {
      setChannelUsers(channelUsersData);
    }
  }, [channelUsersData]);

  useEffect(() => {
    newMember(addMember);
  }, [newMember]);

  useEffect(() => {
    disconnectMember(deleteMember);
  }, [disconnectMember]);

  const onClickHandler = (e: any) => {
    setIsUserModalOpen(true);
  };
  console.log(`온유저`, onUser);
  return (
    <div css={styles.userListBox(isChannelRightSidebarOpen)}>
      <div css={styles.userListInnerBox}>
        {channelUsers &&
          channelUsers.map((member: ChannelUser, i: number) => {
            const isOnUser = onUser.some(
              (user) => user.userID === member.userId
            );
            const isAdmin = member.admin;
            return (
              <div key={i} css={styles.user} onClick={onClickHandler}>
                <UserModal userId={member.userId} />
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
