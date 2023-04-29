import { getProgressPercent } from '@/pages/api/templete/getProgressPercent';
import { pageListState } from '@/recoil/project/atom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import * as styles from './styles';

export const Progress = () => {
  const pageList = useRecoilValue(pageListState);
  // const progressPages = pageList.filter();
  // const [progressPages, setProgressPages] = useState([]);
  console.log('🚀 ~ file: Progress.tsx:8 ~ Progress ~ pageList:', pageList);

  // useEffect(async () => {
  //   await setProgressPages(getProgressPercent());
  // }, []);

  return (
    <div css={styles.contentBox}>
      <h3 css={styles.contentBoxTitle}>진행상황</h3>
      <div css={styles.content}></div>
    </div>
  );
};
