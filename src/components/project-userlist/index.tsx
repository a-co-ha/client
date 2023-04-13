import * as styles from './styles';
import { SocketContext } from '../chat-page/SocketContextProvider';
import { useContext, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { onUserState } from '@/recoil/socket/atom';
import Image from 'next/image';

export const UserList = () => {
  const onUser = useRecoilValue(onUserState);

  return (
    <div css={styles.userListBox}>
      <div>
        <div css={{ textAlign: `center` }}>userlist</div>
        {onUser.map((user, i) => {
          return (
            <div key={i}>
              {/* <Image src={user.img} width={40} height={40} alt={`onUserList`} /> */}
              <span css={styles.isUserOnline}></span>
              <span css={styles.userName}>{user.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
