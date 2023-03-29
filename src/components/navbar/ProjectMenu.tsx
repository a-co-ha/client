import { useRouter } from 'next/router';
import * as styles from './styles';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { channelNameState } from '@/recoil/project/atom';

export const ProjectMenu = () => {
  const router = useRouter();
  const channelName = useRecoilValue(channelNameState);
  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  return (
    <div css={styles.userListBox}>
      <div>
        <p>{channelName}</p>
      </div>
    </div>
  );
};
