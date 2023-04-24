import { useEffect } from 'react';
import { ProjectSideBar } from '@/components/project-sidebar';
import { UserList } from '@/components/project-userlist';
import { MainContent } from '@/components/project-main';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getUser } from '@/pages/api/user/getUser';
import { getUsers } from '@/pages/api/user/getUsers';
import { getChannelPages } from '@/pages/api/editable/getPages';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { useGetUsers } from '@/hooks/queries/user/getUsers';
import { useSetRecoilState } from 'recoil';
import { adminState, inviteChannelState } from '@/recoil/user/atom';
import * as styles from '@/components/project-main/styles';
import type { GetServerSideProps } from 'next';
import type { ChannelUser } from '@/pages/api/user/type';

export default function ProjectMain({ channelId }: { channelId: string }) {
  console.log(`채널@@@`, channelId);
  const setIsAdmin = useSetRecoilState(adminState(channelId));
  const setInviteChannelData = useSetRecoilState(inviteChannelState);
  const { data: userData } = useGetUser();
  const { data: channelUsers } = useGetUsers();

  useEffect(() => {
    if (userData !== undefined && channelUsers !== undefined) {
      console.log(`채널 유저스`, channelUsers);
      const isAdmin = channelUsers.filter(
        (user: ChannelUser) => user.userId === userData.userId
      )[0].admin;
      console.log('이거 인덱스 유저데이타', userData);
      const { userId, channelName } = channelUsers.filter(
        (user: ChannelUser) => user.admin === true
      )[0];
      setIsAdmin(isAdmin);
      setInviteChannelData({ userId, channelName });
      console.log(`인바이트 인포`, userId, channelName);
    }
  }, [channelUsers]);

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
  const channelId = context.query.id as string;
  try {
    if (channelId) {
      await Promise.all([
        queryClient.prefetchQuery([`user`], getUser),
        queryClient.prefetchQuery([`channelPages`, channelId], () =>
          getChannelPages(channelId)
        ),
        queryClient.prefetchQuery([`users`, channelId], () =>
          getUsers(channelId)
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
