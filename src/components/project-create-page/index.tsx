import { createState } from '@/recoil/project/atom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { useRouter } from 'next/router';
import * as styles from './styles';

export const CreateProject = () => {
  const router = useRouter();
  const setCreateState = useSetRecoilState(createState);
  const createProjectHandler = async () => {
    router.push('/project/1/main');
  };
  const cancelProjectHandler = () => {
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
      <button type="button" onClick={createProjectHandler} css={styles.button}>
        생성
      </button>
      <button type="button" onClick={cancelProjectHandler} css={styles.button}>
        취소
      </button>
    </div>
  );
};
