import { List } from './List';
import { Channel } from './Channel';
import { GuideSidebar } from '../guide/GuideSidebar';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { initialUserState } from '@/recoil/user/atom';
import { channelSidebarOpenState } from '@/recoil/project/atom';
import * as styles from './styles';

export const ProjectSideBar = () => {
  const [IsinitialUser, setIsInitialUser] = useRecoilState(initialUserState);
  const isChannelSidebarOpen = useRecoilValue(channelSidebarOpenState);
  console.log(`이니셜 유저`, IsinitialUser);
  return (
    <div css={styles.projectSideBarBox(isChannelSidebarOpen)}>
      <List />
      {IsinitialUser ? <GuideSidebar /> : <Channel />}
    </div>
  );
};
