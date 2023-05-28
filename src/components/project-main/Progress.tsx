import { useGetProgressPercentList } from '@/hooks/queries/main/useGetProgressPercentList';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { ProgressGauge } from '../template/progressGauge';
import * as styles from './styles';
import Link from 'next/link';
import { CreateProgressTemplate } from './CreateProgressTemplate';
import { Icon } from '../project-sidebar/Icons';

export interface PageProgress {
  pageName: string;
  percentage: number;
  _id: string;
}

export const Progress = () => {
  const { channelId } = useGetUrlInfo();
  const { data: pagePercentList } = useGetProgressPercentList(channelId);
  console.log(
    '🚀 ~ file: Progress.tsx:17 ~ Progress ~ pagePercentList:',
    pagePercentList
  );

  return (
    <div css={styles.progressCommonBoxStyle}>
      <h3 css={styles.commonTitleStyle}>
        <Icon.Progress aria-hidden="true" />
      </h3>
      {pagePercentList &&
        (pagePercentList.length > 0 ? (
          <main css={styles.progressContent}>
            {pagePercentList.slice(0, 4).map((page: PageProgress) => (
              <div key={page._id} css={styles.gaugeContainer}>
                <Link
                  href={`/project/${channelId}/${page._id}?name=${page.pageName}&type=template-progress`}
                >
                  <div css={styles.progressTitleGuage}>
                    <ProgressGauge pageId={page._id} />
                    {page.pageName}
                  </div>
                </Link>
              </div>
            ))}
          </main>
        ) : (
          <main css={styles.createProgressContent}>
            <CreateProgressTemplate />
          </main>
        ))}
    </div>
  );
};
