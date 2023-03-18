import * as styles from './styles';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { pageNameShare } from '@/recoil/project/atom';

export const Title = () => {
  const router = useRouter();
  const pageId = router.query.pageId;
  const pageName = useRecoilValue(pageNameShare(pageId));

  return (
    <div css={styles.titleBox}>
      <div>{pageName}</div>
    </div>
  );
};
