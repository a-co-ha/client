import { useRouter } from 'next/router';
import * as styles from './styles';
import { useRecoilValue } from 'recoil';
import { channelNameState } from '@/recoil/project/atom';
import { useDeleteProject } from '@/hooks/queries/project/deleteProject';

export const ProjectMenu = () => {
  const router = useRouter();
  const channelName = useRecoilValue(channelNameState);
  const channelId = router.query.id;
  const deleteProject = useDeleteProject(channelId);

  return (
    <div css={styles.projectNameBox}>
      <div>
        <p>{channelName}</p>
        <button onClick={() => deleteProject.mutate()}>지우기</button>
      </div>
    </div>
  );
};
