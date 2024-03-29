import { useEffect, useLayoutEffect } from 'react';
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
import { githubConnectState } from '@/recoil/github/atom';
import * as styles from '@/components/project-main/styles';
import type { GetServerSideProps } from 'next';
import type { ChannelUser } from '@/pages/api/user/type';

export default function ProjectMain({
  channelIdProps,
}: {
  channelIdProps: string;
}) {
  const setIsAdmin = useSetRecoilState(adminState(channelIdProps));
  const setInviteChannelData = useSetRecoilState(inviteChannelState);
  const setChannelGithubData = useSetRecoilState(
    githubConnectState(channelIdProps)
  );
  const { data: userData } = useGetUser();
  const { data: channelUsers } = useGetUsers();

  useLayoutEffect(() => {
    if (userData !== undefined && channelUsers !== undefined) {
      const myUserData = channelUsers.filter(
        (user: ChannelUser) => user.userId === userData.userId
      )[0];
      const isAdmin = myUserData.admin;
      const { userId, channelName, channelId } = channelUsers.filter(
        (user: ChannelUser) => user.admin === true
      )[0];
      setIsAdmin(isAdmin);
      setInviteChannelData({ userId, channelName, channelId });
      const channelGithubData = userData.channels.filter(
        (channel) => channelIdProps === String(channel.id)
      )[0];
      channelGithubData &&
        setChannelGithubData({
          repoName: channelGithubData.repoName,
          repoType: channelGithubData.repoType,
        });
    }
  }, [userData, channelUsers]);

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
  const channelIdProps = context.query.id as string;
  try {
    if (channelIdProps) {
      await Promise.all([
        queryClient.prefetchQuery([`user`], getUser),
        queryClient.prefetchQuery([`channelPages`, channelIdProps], () =>
          getChannelPages(channelIdProps)
        ),
        queryClient.prefetchQuery([`users`, channelIdProps], () =>
          getUsers(channelIdProps)
        ),
      ]);
    }
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        channelIdProps,
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
