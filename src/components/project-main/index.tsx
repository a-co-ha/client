import { Chart } from './Chart';
import { TroubleShooting } from './TroubleShooting';
import { Progress } from './Progress';
import { CommitLog } from './CommitLog';
import { useSetRecoilState } from 'recoil';
import { channelSidebarOpenState } from '@/recoil/project/atom';

import * as styles from './styles';

export const MainContent = () => {
  //DragDrop 적용 예정
  const setIsChannelSidebarOpen = useSetRecoilState(channelSidebarOpenState);
  const onClickHandler = () => {
    if (window !== undefined) {
      window.innerWidth <= 450 ? setIsChannelSidebarOpen(false) : null;
    }
  };

  return (
    <div css={styles.flexColumnCenter}>
      <div css={styles.mainContentBox} onClick={onClickHandler}>
        <Chart />
        <TroubleShooting />
        <Progress />
        <CommitLog />
      </div>
    </div>
  );
};
