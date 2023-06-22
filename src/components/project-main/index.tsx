import { Progress } from './Progress';
import { CommitLog } from './CommitLog';

import * as styles from './styles';
import { Notice } from './Notice';
import { Suspense } from 'react';
import { RecentPosts } from './RecentPosts';

export const MainContent = () => {
  //DragDrop 적용 예정
  return (
    <Suspense fallback={'loaing..'}>
      <div css={styles.flexColumnCenter}>
        <div css={styles.mainContentBox}>
          <Progress />
          <CommitLog />
          <Notice />
          <RecentPosts />
        </div>
      </div>
    </Suspense>
  );
};
