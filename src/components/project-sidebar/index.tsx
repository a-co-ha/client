import { List } from './List';
import { Channel } from './Channel';
import { projectSideBarBox } from './styles';

export const ProjectSideBar = () => {
  return (
    <div css={projectSideBarBox}>
      <List />
      <Channel />
    </div>
  );
};
