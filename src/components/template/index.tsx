import { useEffect } from 'react';
import * as styles from '../editable-page/styles';
import { ErrorBoundary } from '../error-boundary/index';
import { Error } from './Error';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

interface TemplatePageProps {
  channelId: string;
  pageId: string;
  type: string;
}

export const TemplatePage = ({
  channelId,
  pageId,
  type,
}: TemplatePageProps) => {
  console.log(
    '🚀 ~ file: index.tsx:4 ~ TemplatePage ~ channelId, pageId, type:',
    channelId,
    pageId,
    type
  );

  useEffect(() => {}, []);

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={Error} onReset={reset}>
          <div css={styles.contentBox}>템플릿페이지</div>;
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
