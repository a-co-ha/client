import { css } from '@emotion/react';
import { ProjectSideBar } from '@/components/project-sidebar';
import { UserList } from '@/components/project-userlist';
import { MainContent } from '@/components/project-main';
import { useRecoilValue } from 'recoil';
import { createState } from '@/recoil/project/atom';

export default function ProjectMain() {
  // const isClickCreateBtn = useRecoilValue(createState);

  return (
    <div css={main}>
      <ProjectSideBar />
      <MainContent />
      <UserList />
    </div>
  );
}

const main = css`
  display: flex;
`;
