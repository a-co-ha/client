import * as styles from '@/components/project-main/styles';
import { ProjectSideBar } from '@/components/project-sidebar';
import { UserList } from '@/components/project-userlist';
import { MainContent } from '@/components/project-main';
import { GetServerSideProps } from 'next';

export default function ProjectMain() {
  return (
    <div css={styles.main}>
      <ProjectSideBar />
      <MainContent />
      <UserList />
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return(

//   )
// }
