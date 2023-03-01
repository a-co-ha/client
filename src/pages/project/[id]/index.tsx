import * as styles from '@/components/project-main/styles';
import { ProjectSideBar } from '@/components/project-sidebar';
import { UserList } from '@/components/project-userlist';
import { MainContent } from '@/components/project-main';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { pageListState } from '@/recoil/project/atom';
import { useEffect } from 'react';

export interface pageList {
  pageList: [
    {
      pageId: string;
      pageName: string;
      type: string;
      initial: boolean;
    }
  ];
}

export default function ProjectMain({ pageList }: pageList) {
  const setPageList = useSetRecoilState(pageListState);
  useEffect(() => {
    setPageList(pageList);
    localStorage.setItem('pageList', JSON.stringify(pageList));
  }, [pageList]);
  return (
    <div css={styles.main}>
      <ProjectSideBar />
      <MainContent />
      <UserList />
    </div>
  );
}
/**
 * params로 channelId 받아서 그걸로 프로젝트 조회 -> res = [ {pageId, pageName, type} ] 객체 배열
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const channelId = context.query.id;
  try {
    const res = await axios.get(
      `http://localhost:3000/api/pages?channel=${channelId}`
    );
    const pageList = res.data.pageList;
    return {
      props: { pageList },
    };
  } catch (err) {
    return { props: { pageList: null } };
  }
};
