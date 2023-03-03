import { List } from './List';
import { Channel } from './Channel';
import { GuideSidebar } from '../guide/GuideSidebar';
import { useRecoilValue } from 'recoil';
import { initialUserState } from '@/recoil/user/atom';
import { projectSideBarBox } from './styles';

export const ProjectSideBar = () => {
  const initialUser = useRecoilValue(initialUserState);

  return (
    <div css={projectSideBarBox}>
      <List />
      {initialUser ? <GuideSidebar /> : <Channel />}
    </div>
  );
};
