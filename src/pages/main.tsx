import { ProjectSideBar } from '@/components/project-sidebar';
import { Guide } from '@/components/guide';
import { UserList } from '@/components/project-userlist';
import { css } from '@emotion/react';

export default function Main() {

  return (
    <div css={main}>
      <ProjectSideBar />
      <Guide />
      <UserList />
    </div>
  );
}

const main = css`
  display: flex;
`;
