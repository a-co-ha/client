import { List } from './List';
import { Channel } from './Channel';
import { GuideSidebar } from '../guide/GuideSidebar';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { initialUserState } from '@/recoil/user/atom';
import { getUser } from '@/pages/api/user/getUser';
import { projectSideBarBox } from './styles';

export const ProjectSideBar = () => {
  const setInitialUser = useSetRecoilState(initialUserState);
  useEffect(() => {
    const getInitialState = async () => {
      try {
        const userData = await getUser();
        console.log(userData);
        const initialUser = userData.channels.length === 0 ? true : false;
        setInitialUser(initialUser);
      } catch (err) {
        console.error(err);
      }
    };
    getInitialState();
  }, []);
  const initialUser = useRecoilValue(initialUserState);
  console.log(initialUser);

  return (
    <div css={projectSideBarBox}>
      <List />
      {initialUser ? <GuideSidebar /> : <Channel />}
    </div>
  );
};
