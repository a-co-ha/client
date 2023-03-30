import { useRouter } from 'next/router';
import * as styles from './styles';
import { useRecoilValue } from 'recoil';
import { channelNameState, channelListState } from '@/recoil/project/atom';
import { useDeleteProject } from '@/hooks/queries/project/deleteProject';

export const ProjectMenu = () => {
  const router = useRouter();
  const channelName = useRecoilValue(channelNameState);
  const channelList = useRecoilValue(channelListState);
  const channelId = router.query.id;
  const deleteProject = useDeleteProject(channelId, channelList);

  return (
    <div css={styles.projectNameBox}>
      <div>
        <p>{channelName}</p>
        {channelList.length !== 0 ? (
          <button onClick={() => deleteProject.mutate()}>지우기</button>
        ) : null}
      </div>
    </div>
  );
};
