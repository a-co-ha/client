import { useRecoilState, useRecoilValue } from 'recoil';
import { messageModalState, messageModalImgState } from '@/recoil/socket/atom';
import Image from 'next/image';
import * as styles from './styles';

export const MessageModal = () => {
  const [messageModal, setMessageModal] = useRecoilState(messageModalState);
  const userProfileImgSrc = useRecoilValue(messageModalImgState);
  const onClickHandler = () => {
    setMessageModal(false);
  };
  return (
    <div css={styles.messageModalBox(messageModal)}>
      <div
        onClick={onClickHandler}
        css={styles.messageModalBackground(messageModal)}
      ></div>
      <div css={styles.messageModalBoxTransition(messageModal)}>
        <div className="w-60 max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
          <Image
            src={userProfileImgSrc}
            width={200}
            height={200}
            alt={`userProfileImg`}
          />
        </div>
      </div>
    </div>
  );
};
