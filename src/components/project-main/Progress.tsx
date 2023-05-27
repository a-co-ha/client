import { useGetProgressPercentList } from '@/hooks/queries/main/useGetProgressPercentList';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { PageNameLink } from '../project-sidebar/PageNameLink';
import { ProgressGauge } from '../template/progressGauge';
import * as styles from './styles';
import Link from 'next/link';

export interface PageProgress {
  pageName: string;
  percentage: number;
  _id: string;
}

export const Progress = () => {
  const { channelId } = useGetUrlInfo();
  const { data: pagePercentList } = useGetProgressPercentList(channelId);

  return (
    <div css={styles.commonBoxStyle}>
      <h3 css={styles.commonTitleStyle}>진행현황</h3>
      <main css={styles.content}>
        {pagePercentList &&
          pagePercentList.map((page: PageProgress) => (
            <div key={page._id} css={styles.gaugeContainer}>
              <Link
                href={`/project/${channelId}/${page._id}?name=${
                  page.pageName
                }&type=${'template-progress'}`}
              >
                <div css={styles.progressTitleGuage}>
                  <ProgressGauge pageId={page._id} />
                  {page.pageName}
                </div>
              </Link>
            </div>
          ))}
      </main>
    </div>
  );
};
