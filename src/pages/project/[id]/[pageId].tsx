import * as styles from '@/components/project-main/styles';
import { ProjectSideBar } from '@/components/project-sidebar';
import { UserList } from '@/components/project-userlist';
import { ChatBookmark } from '@/components/chat-bookmark';
import { EditablePage } from '@/components/editable-page';
import { ChatPage } from '@/components/chat-page';
import { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';
import { Suspense, useEffect } from 'react';
import { Loading } from '@/components/loading/Loading';
import { QueryClient, dehydrate, hydrate } from '@tanstack/react-query';
import { getEditablePage } from '@/pages/api/editable/getPage';
import { getSocketPage } from '@/pages/api/socket/getPage';
import type { pageProps } from '@/pages/api/editable/type';
import { TemplatePage } from '@/components/template';
import { channel } from '../../../components/project-sidebar/styles';

export default function Page({ channelId, pageId, type }: pageProps) {
  resetServerContext();
  return (
    /**
     * 여기서 템플릿 페이지도 조건별로 렌더링 시켜야 함
     */
    <div css={styles.main}>
      <Suspense fallback={<Loading />}>
        <ProjectSideBar />
        {type === 'normal' || type === 'progress-page' ? (
          <EditablePage
            channelId={channelId}
            pageId={pageId as string}
            type={type}
          />
        ) : null}
        {type === 'socket' ? (
          <>
            <ChatPage channelId={channelId} pageId={pageId} type={type} />
            <div>
              <UserList />
              <ChatBookmark channelId={channelId} pageId={pageId} />
            </div>
          </>
        ) : null}
        {type === 'template-progress' ? (
          <TemplatePage channelId={channelId} pageId={pageId} type={type} />
        ) : null}
      </Suspense>
    </div>
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
        // } else if (type === `socket`) {
        //   await queryClient.prefetchQuery([`socketPage`, pageId], () =>
        //     getSocketPage(pageId)
        //   );
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
