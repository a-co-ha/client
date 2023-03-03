import { List } from './List';
import { Channel } from './Channel';
import { GuideSidebar } from '../guide/GuideSidebar';
import { projectSideBarBox } from './styles';

export const ProjectSideBar = ({ initialUser }: { initialUser: boolean }) => {
  return (
    <div css={projectSideBarBox}>
      <List />
      {initialUser ? <GuideSidebar /> : <Channel />}
    </div>
  );
};
