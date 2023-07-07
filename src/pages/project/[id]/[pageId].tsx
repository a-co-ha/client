import { ChatBookmark } from '@/components/chat-bookmark';
import { ChatPage } from '@/components/chat-page';
import { EditablePage } from '@/components/editable-page';
import { Loading } from '@/components/loading/Loading';
import * as styles from '@/components/project-main/styles';
import { ProjectSideBar } from '@/components/project-sidebar';
import { UserList } from '@/components/project-userlist';
import { TemplatePage } from '@/components/template';
import { TemplateNormalPage } from '@/components/template-normal';
import { getEditablePage } from '@/pages/api/editable/getPage';
import type { pageProps } from '@/pages/api/editable/type';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { Suspense, useEffect, useState } from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import { useSetParentUrlInfo } from '@/hooks/useSetParentUrlInfo';

export default function Page({ channelId, pageId, type }: pageProps) {
  const [parentPageId, setParentPageId] = useState('');

  useSetParentUrlInfo(channelId);
  useEffect(() => {
    setParentPageId(localStorage.getItem('parentPageId') || '');
  }, [pageId]);

  resetServerContext();

  let content = null;

  switch (type) {
    case 'progress-page':
      if (parentPageId) {
        content = (
          <div style={{ display: 'flex', padding: '1rem', width: '100%' }}>
            <TemplatePage
              channelId={channelId}
              pageId={parentPageId}
              type={'template-progress'}
            />
            <EditablePage
              channelId={channelId}
              pageId={pageId as string}
              type={type}
            />
          </div>
        );
      }
      break;

    case 'normal-page':
      if (parentPageId) {
        content = (
          <div style={{ display: 'flex', padding: '1rem', width: '100%' }}>
            <TemplateNormalPage
              channelId={channelId}
              pageId={parentPageId}
              type={'template-normal'}
            />
            <EditablePage
              channelId={channelId}
              pageId={pageId as string}
              type={type}
            />
          </div>
        );
      }
      break;

    case 'socket':
      content = (
        <>
          <ChatPage channelId={channelId} pageId={pageId} type={type} />
          <div>
            <UserList />
            <ChatBookmark channelId={channelId} pageId={pageId} />
          </div>
        </>
      );
      break;

    case 'normal':
      content = (
        <EditablePage
          channelId={channelId}
          pageId={pageId as string}
          type={type}
        />
      );
      break;

    case 'template-progress':
      content = (
        <TemplatePage channelId={channelId} pageId={pageId} type={type} />
      );
      break;

    case 'template-normal':
      content = (
        <TemplateNormalPage channelId={channelId} pageId={pageId} type={type} />
      );
      break;

    default:
      break;
  }

  return (
    <>
      <div css={styles.main}>
        <Suspense fallback={<Loading position="fixed" />}>
          <ProjectSideBar />
          {content}
          {/* <UserList /> */}
        </Suspense>
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const { id: channelId, pageId, type } = context.query;
  try {
    if (channelId) {
      if (type === `normal` || type === 'progress-page') {
        await queryClient.prefetchQuery([`editablePage`, pageId], () =>
          getEditablePage(channelId, pageId, type)
        );
      }
    }

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        channelId,
        pageId,
        type,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
};
