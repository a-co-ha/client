import * as styles from '@/components/project-main/styles';
import { ProjectSideBar } from '@/components/project-sidebar';
import { UserList } from '@/components/project-userlist';
import { MainContent } from '@/components/project-main';
import { GetServerSideProps } from 'next';
import { useRecoilValue } from 'recoil';
import { initialUserState } from '@/recoil/user/atom';

export interface pageList {
  pageList: [
    {
      pageId: string;
      pageName: string;
      type: string;
    }
  ];
  channelList: [
    {
      id: string;
      channelName: string;
    }
  ];
}

export default function ProjectMain({ pageList, channelList }: pageList) {
  const initialUser = useRecoilValue(initialUserState);
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
  try {
    console.log('server');
    // const res = await axios.get(
    //   `http://localhost:3000/api/pages?channel=${id}`
    // );
    // const pageList = res.data.pageList;
    // const channelList = [{ id, channelName }];
    // console.log(channelList);
    return {
      props: {},
    };
  } catch (err) {
    return { props: { pageList: null, channelList: null } };
  }
};
