import * as styles from './styles';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { pageTitleShare } from '@/recoil/project/atom';

export const Title = () => {
  const router = useRouter();
  const pageId = router.query.pageId;
  const pageTitle = useRecoilValue(pageTitleShare(pageId));

  return (
    <div css={styles.titleBox}>
      <div>{pageTitle}</div>
    </div>
  );
};
