import { createState } from '@/recoil/project/atom';
import { useSetRecoilState } from 'recoil';
import * as styles from './styles';

export const CreateProject = () => {
  const setCreateState = useSetRecoilState(createState);
  const onClickHandler = () => {
    setCreateState(false);
  };
  return (
    <div css={styles.createProjectBox}>
      <div>프로젝트 생성페이지</div>
      <select name="" id="">
        <option value="">1</option>
        <option value="">2</option>
      </select>
      <select name="" id="">
        <option value="">1</option>
        <option value="">2</option>
      </select>
      <select name="" id="">
        <option value="">1</option>
        <option value="">2</option>
      </select>
      <button type="button" onClick={onClickHandler} css={styles.cancelBtn}>
        취소
      </button>
    </div>
  );
};
