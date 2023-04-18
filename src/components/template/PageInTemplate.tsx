import { PageNameForm } from '../project-sidebar/PageNameForm';
import { PageNameLink } from '../project-sidebar/PageNameLink';
import type { PageInTemplateProps } from './type';

export const PageInTemplate = ({
  channelId,
  pageId,
  pageName,
  type,
}: PageInTemplateProps) => {
  return (
    <>
      <PageNameForm channelId={channelId} pageId={pageId} pageName={pageName} />
      <PageNameLink
        channelId={channelId}
        pageId={pageId}
        pageName={pageName}
        type={type}
      />
    </>
  );
};
