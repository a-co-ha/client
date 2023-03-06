import * as styles from './styles';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { useEffect, useRef } from 'react';

export const Title = () => {
  const router = useRouter();
  const pageName = router.query.name;
  const pageNames = useRef();
  useEffect(() => {}, []);

  return (
    <div css={styles.titleBox}>
      <div>{pageName}</div>
    </div>
  );
};
