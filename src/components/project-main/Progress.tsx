import { useGetProgressPercentList } from '@/hooks/queries/main/useGetProgressPercentList';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { PageNameLink } from '../project-sidebar/PageNameLink';
import { ProgressGauge } from '../template/progressGauge';
import * as styles from './styles';

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
              <PageNameLink
                channelId={channelId}
                pageId={page._id}
                pageName={page.pageName}
                type={'template-progress'}
              />
              <ProgressGauge pageId={page._id} />
            </div>
          ))}
      </main>
    </div>
  );
};
