import { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { inviteChannelState, inviteModalState } from '@/recoil/user/atom';
import * as styles from './styles';

export const InviteModal = () => {
  const { userId, channelName } = useRecoilValue(inviteChannelState);
  const [isInviteModal, setIsInviteModal] = useRecoilState(inviteModalState);
  let [isCopied, setIsCopied] = useState(false);
  console.log(`인코딩 되기전`, userId, channelName);
  const encodedUserId = Buffer.from(String(userId)).toString('base64');
  const encodedChannelName = Buffer.from(channelName).toString('base64');
  const inviteUrl = `https://acoha.site/invite/${encodedUserId}?channelCode=${encodedChannelName}`;
  console.log(`인코딩 된 후 `, encodedUserId, encodedChannelName);
  const onClickHandler = () => {
    setIsInviteModal(false);
    setIsCopied(false);
  };
  const codeCopyHandler = (inviteUrl: string) => {
    navigator.clipboard.writeText(inviteUrl);
    setIsCopied(true);
  };
  return (
    <div>
      <div css={styles.projectInviteBox(isInviteModal)}>
        <div
          onClick={onClickHandler}
          css={styles.inviteModalBackground(isInviteModal)}
        ></div>
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <h3 className="mt-2">프로젝트 초대코드</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500 select-text">{inviteUrl}</p>
          </div>
          <div className="mt-2">
            <button
              css={styles.inviteModalCopyBtn(isCopied)}
              onClick={() => codeCopyHandler(inviteUrl)}
            >
              {isCopied ? `Copied` : `Copy`}
            </button>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <button
    //     type="button"
    //     onClick={openModal}
    //     className="w-full text-sm text-left pointer-events-auto"
    //   >
    //     프로젝트 초대하기
    //   </button>

    //   <Transition appear show={isInviteModal} as={Fragment}>
    //     <Dialog as="div" className="relative z-10" onClose={closeModal}>
    //       <Transition.Child
    //         as={Fragment}
    //         enter="ease-out duration-300"
    //         enterFrom="opacity-0"
    //         enterTo="opacity-100"
    //         leave="ease-in duration-200"
    //         leaveFrom="opacity-100"
    //         leaveTo="opacity-0"
    //       >
    //         <div className="fixed inset-0 bg-black bg-opacity-25 z-5" />
    //       </Transition.Child>

    //       <div className="fixed inset-0 overflow-y-auto">
    //         <div className="flex min-h-full items-center justify-center p-4 text-center">
    //           <Transition.Child
    //             as={Fragment}
    //             enter="ease-out duration-300"
    //             enterFrom="opacity-0 scale-95"
    //             enterTo="opacity-100 scale-100"
    //             leave="ease-in duration-200"
    //             leaveFrom="opacity-100 scale-100"
    //             leaveTo="opacity-0 scale-95"
    //           >
    //             <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
    //               <Dialog.Title
    //                 as="h3"
    //                 className="text-lg font-medium leading-6 text-gray-900"
    //               >
    //                 프로젝트 초대 코드
    //               </Dialog.Title>
    //               <div className="mt-2">
    //                 <p className="text-sm text-gray-500">{inviteUrl}</p>
    //               </div>

    //               <div className="mt-4">
    //                 <button
    //                   type="button"
    //                   className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    //                 >
    //                   복사하기
    //                 </button>
    //               </div>
    //             </Dialog.Panel>
    //           </Transition.Child>
    //         </div>
    //       </div>
    //     </Dialog>
    //   </Transition>
    // </div>
  );
};
