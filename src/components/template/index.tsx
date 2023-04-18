import { Fragment, useEffect } from 'react';
import * as styles from '../editable-page/styles';
import { ErrorBoundary } from '../error-boundary/index';
import { Error } from './Error';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useCreateTemplateInPage } from '@/hooks/queries/template/useCreateTemplateInPage';
import { PageNameLink } from '../project-sidebar/PageNameLink';
import { useGetEditablePage } from '@/hooks/queries/editable/getPage';
import { PageNameForm } from '../project-sidebar/PageNameForm';

interface TemplatePageProps {
  channelId: string;
  pageId: string;
  type: string;
}
/**
 * 템플릿 안 페이지 리스트 가져오는 api
 *
 */

export const TemplatePage = ({
  channelId,
  pageId,
  type,
}: TemplatePageProps) => {
  const { mutate: createPage, data } = useCreateTemplateInPage();
  const { data: pageList } = useGetEditablePage(channelId, pageId, type);
  console.log('🚀 ~ file: index.tsx:27 ~ getPages:', pageList);
  console.log('🚀 ~ file: index.tsx:21 ~ data:', data?.data);

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={Error} onReset={reset}>
          <div css={styles.contentBox}>
            <button onClick={() => createPage()}>+ 새로 만들기</button>
            {pageList?.map((page: any) => {
              return (
                <Fragment key={page._id}>
                  <PageNameForm
                    channelId={channelId}
                    pageId={page._id}
                    pageName={page.pageName}
                  />
                  <PageNameLink
                    channelId={channelId}
                    pageId={page._id}
                    pageName={page.pageName}
                    type={page.type}
                  />
                </Fragment>
              );
            })}
          </div>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

/**
 *
 *
 */
