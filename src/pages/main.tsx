import { useRecoilValue } from 'recoil';
import { initialUserState } from '@/recoil/user/atom';
import { ProjectSideBar } from '@/components/project-sidebar';
import { Guide } from '@/components/guide';
import { UserList } from '@/components/project-userlist';
import { css } from '@emotion/react';

export default function Main() {
  const initialUser = useRecoilValue(initialUserState);

  return (
    <div css={main}>
      <ProjectSideBar initialUser={initialUser} />
      {initialUser && <Guide />}
      <UserList />
    </div>
  );
}

const main = css`
  display: flex;
`;
