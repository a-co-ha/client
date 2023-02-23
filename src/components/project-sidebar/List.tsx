import { createState } from '@/recoil/project/atom';
import { useSetRecoilState } from 'recoil';
import * as styles from './styles';

export const List = () => {
  const setCreateState = useSetRecoilState(createState);
  const onClickHandler = () => {
    setCreateState(true);
  };

  return (
    <div css={styles.list}>
      <div>List</div>
      <button type="button" onClick={onClickHandler} css={styles.createBtn}>
        +
      </button>
    </div>
  );
};
