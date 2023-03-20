import * as styles from '@/components/project-main/styles';
import { ProjectSideBar } from '@/components/project-sidebar';
import { UserList } from '@/components/project-userlist';
import { MainContent } from '@/components/project-main';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { getUser } from '@/pages/api/user/getUser';
import { getEditablePages } from '@/pages/api/editable/getPages';

export default function ProjectMain() {
  return (
    <div css={styles.main}>
      <ProjectSideBar />
      <MainContent />
      <UserList />
    </div>
  );
}

/**
 * 나중에 main content가 많아지면 추가 요청할 여지가 있음
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const channelId = context.query.id;
  try {
    await Promise.all([
      queryClient.prefetchQuery([`user`], getUser),
      queryClient.prefetchQuery([`editablePage`, channelId], () =>
        getEditablePages(channelId)
      ),
    ]);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
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
