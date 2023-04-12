import { useRecoilState } from 'recoil';
import { messageModalState } from '@/recoil/socket/atom';
import Image from 'next/image';
import * as styles from './styles';
import githubChannelImg from '@/images/github_channel.png';

export const MessageModal = ({ img }: any) => {
  const [messageModal, setMessageModal] = useRecoilState(messageModalState);
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
            src={githubChannelImg}
            width={200}
            height={200}
            alt={`messageImg`}
          />
        </div>
      </div>
    </div>
  );
};
