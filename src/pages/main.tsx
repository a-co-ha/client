import { ProjectSideBar } from '@/components/project-sidebar';
import { Guide } from '@/components/guide';
import { UserList } from '@/components/project-userlist';
import { css } from '@emotion/react';

export default function Main() {
  return (
    /** initialUser가 아니면 현재 최상단 프로젝트의 main보여주기 */
    <div css={main}>
      <ProjectSideBar />
      <Guide />
      {/* <UserList /> */}
    </div>
  );
}

const main = css`
  display: flex;
`;
