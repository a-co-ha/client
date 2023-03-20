import * as styles from '@/components/project-main/styles';
import { ProjectSideBar } from '@/components/project-sidebar';
import { UserList } from '@/components/project-userlist';
import { EditablePage } from '@/components/editable-page';
import { getEditablePage } from '@/pages/api/editable/getPage';
import { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';
import { getSocketPage } from '../../api/socket/getPage';
import { ChatPage } from '@/components/chat-page';
import { Suspense } from 'react';
import { Loading } from '@/components/loading/Loading';
import type { EditablePages } from '@/components/editable-page/types';

interface Chat {
  page: [
    {
      userId: string;
      content: string;
    }
  ];
}
export interface PageList {
  editablePage?: EditablePages;
  socketPage?: Chat;
  type: string;
}

export default function Page({ editablePage, socketPage, type }: PageList) {
  console.log('editable', editablePage);
  resetServerContext();
  return (
    /**
     * 여기서 템플릿 페이지도 조건별로 렌더링 시켜야 함
     */
    <div css={styles.main}>
      <Suspense fallback={<Loading />}>
        <ProjectSideBar />
        {type === 'normal' && editablePage ? (
          <EditablePage
            id={editablePage.id}
            fetchedBlocks={editablePage.fetchedBlocks}
            err={editablePage.err}
          />
        ) : null}
        {type === 'socket' && socketPage ? <ChatPage /> : null}
        <UserList />
      </Suspense>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id: channelId, pageId, type } = context.query;
    console.log(context.query);
    if (type === 'normal') {
      const fetchedBlocks = await getEditablePage(channelId, pageId, type);
      console.log('fetchedblock', fetchedBlocks);
      const err = fetchedBlocks === null ? true : false;
      return {
        props: {
          editablePage: { fetchedBlocks, id: pageId, err },
          type,
        },
      };
    } else if (type === 'socket') {
      const pageData = await getSocketPage(channelId, pageId);
      const socketPage = pageData.page;
      return {
        props: { socketPage, type },
      };
    } else {
      return { props: { editablePage: null, socketPage: null, type: null } };
    }
  } catch (err) {
    return {
      props: { editablePage: null, socketPage: null, type: null },
    };
  }
};
