import axios from 'axios';
import { useRouter } from 'next/router';
import * as styles from './styles';

/** editable-template 전용 컴포넌트 */
export const SelectPage = () => {
  const router = useRouter();
  const onclickHandler = async () => {
    /**  템플릿 선택하는 순간 헤야 하는 것
     * 1. page.initial -> 서버에 page put요청
     * 2. 해당 템플릿 컴포넌트 렌더링
     */
    const { id: channelId, pageId } = router.query;
    console.log(channelId, pageId);
    await axios.put(
      `http://localhost:3000/api/post/${pageId}?channel=${channelId}`,
      { blocks: [], initial: false }
    );

    return;
  };

  return (
    <div>
      <div css={styles.grid}>
        <div>
          <button onClick={onclickHandler}>normal</button>
        </div>
        <div>progress</div>
        <div>example1</div>
        <div>example2</div>
      </div>
    </div>
  );
};

// const pageData = await axios.get(
//   `http://localhost:3000/api/post/${pageId}?channel=${channelId}`
// );
