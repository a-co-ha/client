import { useGetChannelPages } from '@/hooks/queries/editable/getPages';
import { useExitProject } from '@/hooks/queries/project/exitProject';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import {
  changeProjectImgModalState,
  channelListState,
  channelNameState,
  channelSidebarOpenState,
  deleteModalState,
} from '@/recoil/project/atom';
import { adminState, inviteModalState } from '@/recoil/user/atom';
import { ArrowDownCircleIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { InviteModal } from './inviteModal';
import { ProjectDeleteForm } from './ProjectDeleteForm';
import { ProjectImageModal } from './ProjectImageModal';
import * as styles from './styles';

export const ProjectMenu = () => {
  const { channelId } = useGetUrlInfo();
  const channelName = useRecoilValue(channelNameState);
  const channelList = useRecoilValue(channelListState);
  const isAdmin = useRecoilValue(adminState(channelId));
  const setIsInviteModal = useSetRecoilState(inviteModalState);
  const setIsDeleteModal = useSetRecoilState(deleteModalState);
  const setIsChangeImgModal = useSetRecoilState(changeProjectImgModalState);
  // const { data: channelPages } = useGetChannelPages(channelId);
  const exitProject = useExitProject(channelId);
  let [isOpen, setIsOpen] = useState(false);
  // const [channelName, setChannelName] = useRecoilState(channelNameState);
  const isChannelSidebarOpen = useRecoilValue(channelSidebarOpenState);
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  useEffect(() => {}, [channelName]);
  // useEffect(() => {
  //   if (channelPages !== undefined) {
  //     // setChannelName(channelPages.channelName);
  //     console.log(`뉴`, channelPages);
  //   }
  // }, [channelPages, channelName]);

  return (
    <div css={styles.projectNameBox(isChannelSidebarOpen)}>
      <ProjectImageModal channelId={channelId} channelNameValue={channelName} />
      <InviteModal />
      <ProjectDeleteForm channelId={channelId} />
      <div
        onClick={onClickHandler}
        className="relative inline-block text-left w-[200px]"
      >
        <div css={styles.modalBackground(isOpen)}></div>
        <div className="">
          <div className="group inline-flex w-full justify-center cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <p>{channelName}</p>
            <ArrowDownCircleIcon
              className="ml-auto -mr-1 h-5 w-5 text-gray-400 group-hover:text-violet-100 text-right"
              aria-hidden="true"
            />
          </div>
        </div>

        <div css={styles.projectNameBoxTransition(isOpen)}>
          <div className="px-1 py-1">
            <div
              onClick={() => setIsChangeImgModal(true)}
              className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-violet-500 hover:text-white text-gray-900"
            >
              <button>프로젝트 정보 변경하기</button>
            </div>
            {channelList.length !== 0 ? (
              <div
                onClick={() => setIsInviteModal(true)}
                className="flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-violet-500 hover:text-white text-gray-900"
              >
                프로젝트 초대하기
              </div>
            ) : null}
            {isAdmin ? (
              <div
                onClick={() => setIsDeleteModal(true)}
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-violet-500 hover:text-white text-red-600"
              >
                <button>프로젝트 삭제하기</button>
              </div>
            ) : (
              <div
                onClick={() => exitProject.mutate()}
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-violet-500 hover:text-white text-red-600"
              >
                <button>프로젝트 나가기</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
{
}
