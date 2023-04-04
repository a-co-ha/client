import { List } from './List';
import { Channel } from './Channel';
import { GuideSidebar } from '../guide/GuideSidebar';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { initialUserState } from '@/recoil/user/atom';
import { projectSideBarBox } from './styles';

export const ProjectSideBar = () => {
  const [IsinitialUser, setIsInitialUser] = useRecoilState(initialUserState);
  console.log(`이니셜 유저`, IsinitialUser);
  return (
    <div css={projectSideBarBox}>
      <List />
      {IsinitialUser ? <GuideSidebar /> : <Channel />}
    </div>
  );
};
