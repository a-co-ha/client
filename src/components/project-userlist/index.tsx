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
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';

export const UserList = () => {
  const { data: channelUsersData } = useGetUsers();
  const { type } = useGetUrlInfo();
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
      const newMember = prev.concat([member]);
      return newMember;
    });
  };

  const deleteMember = (member: any) => {
    setOnUser((prev: any) => {
      const newOnUsers = prev.filter(
        (prevUser: any) => prevUser.userID !== member.userID
      );
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
  return (
    <div css={styles.userListBox(isChannelRightSidebarOpen, type)}>
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
