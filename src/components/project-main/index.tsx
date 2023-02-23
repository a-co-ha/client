import { Chart } from './Chart';
import { TroubleShooting } from './TroubleShooting';
import { Progress } from './Progress';
import { CommitLog } from './CommitLog';

import * as styles from './styles';

export const MainContent = () => {
  //DragDrop 적용 예정
  return (
    <div css={styles.flexColumnCenter}>
      <div>메인 컨텐츠</div>
      <div css={styles.MainContentBox}>
        <Chart />
        <TroubleShooting />
        <Progress />
        <CommitLog />
      </div>
    </div>
  );
};
