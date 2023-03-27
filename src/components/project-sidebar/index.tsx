import { List } from './List';
import { Channel } from './Channel';
import { GuideSidebar } from '../guide/GuideSidebar';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { initialUserState } from '@/recoil/user/atom';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { projectSideBarBox } from './styles';

export const ProjectSideBar = () => {
  const [initialUser, setInitialUser] = useRecoilState(initialUserState);
  // const { data: userData } = useGetUser();
  useEffect(() => {
    try {
      // if( userData !== undefined) {
      //   const initialUser = userData.channels.length === 0 ? true : false;
      //   setInitialUser(initialUser);
      // }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div css={projectSideBarBox}>
      <List />
      {initialUser ? <GuideSidebar /> : <Channel />}
    </div>
  );
};
