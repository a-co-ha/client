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
//FIXME: 페이지이름 수정 시 해당페이지 안 외에는 바뀌지 않음
export const Progress = () => {
  const { channelId } = useGetUrlInfo();
  const { data: pagePercentList } = useGetProgressPercentList(channelId);
  console.log(
    '🚀 ~ file: Progress.tsx:16 ~ Progress progressGauge ~ pagePercentList:',
    pagePercentList
  );

  return (
    <div css={styles.contentBox}>
      <h3 css={styles.contentBoxTitle}>진행상황</h3>
      <main css={styles.content}>
        {pagePercentList &&
          pagePercentList.map((page: PageProgress) => (
            <div key={page._id}>
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
