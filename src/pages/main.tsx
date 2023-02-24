import { ProjectSideBar } from '@/components/project-sidebar';
import { Guide } from '@/components/guide';
import { UserList } from '@/components/project-userlist';
import { CreateProject } from '@/components/project-create-page';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { createState } from '@/recoil/project/atom';

export default function Main() {
  const isClickCreateBtn = useRecoilValue(createState);

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
