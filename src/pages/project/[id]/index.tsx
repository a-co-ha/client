import * as styles from '@/components/project-main/styles';
import { ProjectSideBar } from '@/components/project-sidebar';
import { UserList } from '@/components/project-userlist';
import { MainContent } from '@/components/project-main';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getUser } from '@/pages/api/user/getUser';
import { getEditablePages } from '@/pages/api/editable/getPages';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { useGetUsers } from '@/hooks/queries/user/getUsers';
import { useSetRecoilState } from 'recoil';
import { adminState } from '@/recoil/user/atom';
import type { GetServerSideProps } from 'next';
import type { ChannelUser } from '@/pages/api/user/type';

export default function ProjectMain({ channelId }: { channelId: string }) {
  const setIsAdmin = useSetRecoilState(adminState(channelId));
  const { data: userData } = useGetUser();
  const { data: channelUsers } = useGetUsers(channelId);
  if (userData !== undefined && channelUsers !== undefined) {
    console.log(`채널 유저스`, channelUsers);
    const myUserData = channelUsers.filter(
      (user: ChannelUser) => user.userId === userData.userId
    );
    const isAdmin = myUserData[0].admin;
    setIsAdmin(isAdmin);
  }

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
    if (channelId) {
      await Promise.all([
        queryClient.prefetchQuery([`user`], getUser),
        queryClient.prefetchQuery([`editablePages`, channelId], () =>
          getEditablePages(channelId)
        ),
      ]);
    }
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        channelId,
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
