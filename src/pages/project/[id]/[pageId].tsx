import * as styles from '@/components/project-main/styles';
import { ProjectSideBar } from '@/components/project-sidebar';
import { UserList } from '@/components/project-userlist';
import { EditablePage } from '@/components/editable-page';
import { SelectPage } from '@/components/editable-template-page';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { resetServerContext } from 'react-beautiful-dnd';
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
  initial: boolean | string;
}

export default function Page({
  editablePage,
  socketPage,
  type,
  initial,
}: PageList) {
  resetServerContext();
  initial === 'true' ? (initial = true) : (initial = false);
  return (
    <div css={styles.main}>
      <ProjectSideBar />
      {type === 'normal' && editablePage && !initial ? (
        <EditablePage
          id={editablePage.id}
          fetchedBlocks={editablePage.fetchedBlocks}
          err={editablePage.err}
        />
      ) : type === 'normal' && initial ? (
        <SelectPage />
      ) : null}
      {type === 'socket' && socketPage ? <div>socket</div> : null}
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
    const { id: channelId, pageId, type, initial } = context.query;
    if (type === 'normal') {
      const pageData = await axios.get(
        `http://localhost:3000/api/get/editable?page=${pageId}?channel=${channelId}`
      );
      const blocks = pageData.data.page.blocks;
      return {
        props: {
          editablePage: { fetchedBlocks: blocks, id: pageId, err: false },
          type,
          initial,
        },
      };
    } else if (type === 'socket') {
      const pageData = await axios.get(
        `http://localhost:3000/api/get/socket?page=${pageId}?channel=${channelId}`
      );
      const socketPage = pageData.data.page;
      return {
        props: { socketPage, type, initial },
      };
    } else {
      return { props: { socketPage: null, type: null, initial: null } };
    }
  } catch (err) {
    return {
      props: {},
    };
  }
};
