import { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { inviteChannelState, inviteModalState } from '@/recoil/user/atom';
import { channelImageState } from '@/recoil/project/atom';
import { HelpModal } from '@/hooks/useHelpModal';
import * as styles from './styles';
import { toast } from 'react-toastify';

export interface OgData {
  title: string;
  desc: string;
  image: string;
  id: string;
  type: `main` | `invite`;
}

export const InviteModal = () => {
  const { userId, channelName } = useRecoilValue(inviteChannelState);
  const [isInviteModal, setIsInviteModal] = useRecoilState(inviteModalState);
  let [isCopied, setIsCopied] = useState(false);
  const encodedUserId = Buffer.from(String(userId)).toString('base64');
  const encodedChannelName = Buffer.from(channelName).toString('base64');
  const inviteUrl = `https://acoha.site/invite/${encodedUserId}?channelCode=${encodedChannelName}`;
  const onClickHandler = () => {
    setIsInviteModal(false);
    setIsCopied(false);
  };
  const codeCopyHandler = (inviteUrl: string) => {
    navigator.clipboard.writeText(inviteUrl);
    setIsCopied(true);
  };

  const codeShareHandler = (inviteUrl: string, channelName: string) => {
    try {
      navigator.share({
        title: `프로젝트 ${channelName} | 아코하`,
        url: `${inviteUrl}`,
      });
    } catch (e) {
      toast.error(`공유하기가 지원되지 않는 환경입니다`);
    }
  };

  return (
    <div css={styles.projectInviteBox(isInviteModal)}>
      <div
        onClick={onClickHandler}
        css={styles.inviteModalBackground(isInviteModal)}
      ></div>
      <div css={styles.projectInviteBoxTransition(isInviteModal)}>
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
          <div className="flex justify-between">
            <h3 className="mt-2">프로젝트 초대코드</h3>
            <HelpModal
              content={`Share 기능은 모바일에서만 가능합니다. 또한 카톡브라우저에서는 동작하지 않아요.`}
              direction={`left`}
            />
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500 select-text">{inviteUrl}</p>
          </div>
          <div className="mt-2 text-right">
            <button
              css={styles.inviteModalCopyBtn(isCopied)}
              onClick={() => codeCopyHandler(inviteUrl)}
            >
              {isCopied ? `Copied ✔️` : `Copy`}
            </button>
            <button
              css={styles.inviteModalShareBtn}
              onClick={() => codeShareHandler(inviteUrl, channelName)}
            >
              {`Share`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
