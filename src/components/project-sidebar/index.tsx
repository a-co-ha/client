import { channelSidebarOpenState } from '@/recoil/project/atom';
import { initialUserState } from '@/recoil/user/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Channel } from './Channel';
import { List } from './List';
import * as styles from './styles';

export const ProjectSideBar = () => {
  const [isInitialUser, setIsInitialUser] = useRecoilState(initialUserState);
  const isChannelSidebarOpen = useRecoilValue(channelSidebarOpenState);
  console.log(`이니셜 유저`, isInitialUser);
  return (
    <div css={styles.projectSideBarBox(isChannelSidebarOpen)}>
      <List />
      {!isInitialUser ? <Channel /> : null}
    </div>
  );
};
