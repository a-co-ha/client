import { useGetProgressPercentList } from '@/hooks/queries/main/useGetProgressPercentList';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { ProgressGauge } from '../template/progressGauge';
import * as styles from './styles';
import Link from 'next/link';
import { CreateProgressTemplate } from './CreateProgressTemplate';
import { Title } from './RecentPosts';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';

export interface PageProgress {
  pageName: string;
  percentage: number;
  _id: string;
}

export const Progress = () => {
  const { channelId } = useGetUrlInfo();
  const { data: pagePercentList = [] } = useGetProgressPercentList(channelId);

  return (
    <div css={Container}>
      <span css={Title}>
        <FontAwesomeIcon icon={faPersonRunning} />
        <b>진행률</b>
      </span>
      {pagePercentList.length > 0 ? (
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
      )}
    </div>
  );
};

const Container = css`
  display: flex;
  height: fit-content;
  width: 32rem;
  flex-direction: column;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1);
  margin: 0 auto;
  @media (max-width: 600px) {
    width: 300px;
  }
`;
