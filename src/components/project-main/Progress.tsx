import { useGetProgressPercentList } from '@/hooks/queries/main/useGetProgressPercentList';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { ProgressGauge } from '../template/progressGauge';
import * as styles from './styles';
import Link from 'next/link';
import { useCreateTemplate } from '@/hooks/queries/template/useCreateTemplate';

export interface PageProgress {
  pageName: string;
  percentage: number;
  _id: string;
}

export const Progress = () => {
  const { channelId } = useGetUrlInfo();
  const { data: pagePercentList } = useGetProgressPercentList(channelId);
  console.log(
    '🚀 ~ file: Progress.tsx:16 ~ Progress ~ pagePercentList:',
    pagePercentList
  );
  const { mutate: createTemplateMutate } = useCreateTemplate();

  return (
    <div css={styles.commonBoxStyle}>
      <h3 css={styles.commonTitleStyle}>진행현황</h3>
      <main css={styles.content}>
        {pagePercentList && pagePercentList.length > 0 ? (
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
          ))
        ) : (
          <button
            css={styles.svgButtonStyles}
            onClick={() => createTemplateMutate('progress')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
              css={styles.svgIconStyles}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <p>프로젝트 시작하기</p>
          </button>
        )}
      </main>
    </div>
  );
};
