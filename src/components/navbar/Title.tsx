import * as styles from './styles';
import { useRouter } from 'next/router';

export const Title = () => {
  const router = useRouter();
  const pageName = router.query.name;
  return (
    <div css={styles.titleBox}>
      <div>{pageName}</div>
    </div>
  );
};
