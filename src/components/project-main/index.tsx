import { MainCalendar } from './Calendar';
import { Progress } from './Progress';
import { CommitLog } from './CommitLog';
import { useSetRecoilState } from 'recoil';
import { channelSidebarOpenState } from '@/recoil/project/atom';

import * as styles from './styles';
import { Notice } from './notice/Notices';
import { Suspense } from 'react';
import { RecentPosts } from './RecentPosts';
import { Notice } from './notice/Notice';

export const MainContent = () => {
  const setIsChannelSidebarOpen = useSetRecoilState(channelSidebarOpenState);
  const onClickHandler = () => {
    if (window !== undefined) {
      window.innerWidth <= 450 ? setIsChannelSidebarOpen(false) : null;
    }
  };

  return (
    <Suspense fallback={'loaing..'}>
      <div css={styles.flexColumnCenter}>
        <div css={styles.mainContentBox} onClick={onClickHandler}>
          <MainCalendar />
          <Progress />
          <Notice />
          <RecentPosts />
          <CommitLog />
        </div>
      </div>
    </Suspense>
  );
};
