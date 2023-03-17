import * as styles from '@/components/project-main/styles';
import { ProjectSideBar } from '@/components/project-sidebar';
import { UserList } from '@/components/project-userlist';
import { EditablePage } from '@/components/editable-page';
import { getEditablePage } from '@/pages/api/editable/getPage';
import { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';
import { getSocketPage } from '../../api/socket/getPage';
import { ChatPage } from '@/components/chat-page';
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
    </div>
  );
}
/**
 * params로 channelId 받아서 그걸로 프로젝트 조회 -> res = [ {pageId, pageName, type} ] 객체 배열
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    //여기서 query parameter로 public=true면 selet컴포넌트 보여줌
    const { id: channelId, pageId, type } = context.query;
    console.log(context.query);
    if (type === 'normal') {
      const fetchedBlocks = await getEditablePage(channelId, pageId, type);
      console.log('fetchedblock', fetchedBlocks);
      return {
        props: {
          editablePage: { fetchedBlocks, id: pageId, err: false },
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
