import * as styles from '@/components/project-main/styles';
import { ProjectSideBar } from '@/components/project-sidebar';
import { UserList } from '@/components/project-userlist';
import { EditablePage } from '@/components/editable-page';
import { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';
import { ChatPage } from '@/components/chat-page';
import { Suspense, useEffect } from 'react';
import { Loading } from '@/components/loading/Loading';
import { QueryClient, dehydrate, hydrate } from '@tanstack/react-query';
import { getEditablePage } from '@/pages/api/editable/getPage';
import { useGetEditablePage } from '../../../hooks/queries/editable/getPage';
import type { pageProps } from '@/pages/api/editable/type';

export default function Page({ channelId, pageId, type }: pageProps) {
  const { data: fetchedBlocks } = useGetEditablePage(channelId, pageId, type);
  const err = fetchedBlocks === null ? true : false;
  resetServerContext();
  return (
    /**
     * 여기서 템플릿 페이지도 조건별로 렌더링 시켜야 함
     */
    <div css={styles.main}>
      <Suspense fallback={<Loading />}>
        <ProjectSideBar />
        {type === 'normal' && fetchedBlocks ? (
          <EditablePage
            id={pageId as string}
            fetchedBlocks={fetchedBlocks}
            err={err}
          />
        ) : null}
        {/* {type === 'socket' && socketPage ? <ChatPage /> : null} */}
        <UserList />
      </Suspense>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { id: channelId, pageId, type } = context.query;
  try {
    // if (type === 'normal') {
    if (channelId) {
      await queryClient.prefetchQuery([`editablePage`, pageId], () =>
        getEditablePage(channelId, pageId, type)
      );
    }

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        channelId,
        pageId,
        type,
      },
    };
    // } else if (type === 'socket') {
    //   const pageData = await getSocketPage(channelId, pageId);
    //   const socketPage = pageData.page;
    //   return {
    //     props: { socketPage, type },
    //   };
    // } else {
    //   return { props: { editablePage: null, socketPage: null, type: null } };
    // }
  } catch (err) {
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
};
