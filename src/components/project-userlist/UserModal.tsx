import { useRecoilState } from 'recoil';
import { channelUserModalState } from '@/recoil/user/atom';
import * as styles from './styles';

export const UserModal = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useRecoilState(
    channelUserModalState
  );

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(isUserModalOpen);
    e.stopPropagation();

    setIsUserModalOpen(false);
  };

  return (
    <div>
      <div
        onClick={onClickHandler}
        css={styles.userModalBackground(isUserModalOpen)}
      ></div>
      <div css={styles.userModalTransition(isUserModalOpen)}>
        <div css={styles.userModalBox}>
          <div css={styles.userModalRightArrow}></div>
          <div css={styles.userModalBtn}>
            <button>다이렉트 메세지 보내기</button>
          </div>
        </div>
      </div>
    </div>
  );
};
