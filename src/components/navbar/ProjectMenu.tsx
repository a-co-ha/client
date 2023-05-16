import { useRouter } from 'next/router';
import * as styles from './styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  channelNameState,
  channelListState,
  deleteModalState,
} from '@/recoil/project/atom';
import { useDeleteProject } from '@/hooks/queries/project/deleteProject';
import { useExitProject } from '@/hooks/queries/project/exitProject';
import { useEffect, useState, useLayoutEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { InviteModal } from './inviteModal';
import { ProjectDeleteForm } from './ProjectDeleteForm';
import { inviteModalState } from '@/recoil/user/atom';
import { adminState } from '@/recoil/user/atom';

export const ProjectMenu = () => {
  const router = useRouter();
  const channelId = router.query.id;
  const channelName = useRecoilValue(channelNameState);
  const channelList = useRecoilValue(channelListState);
  const isAdmin = useRecoilValue(adminState(channelId));
  const setIsInviteModal = useSetRecoilState(inviteModalState);
  const setIsDeleteModal = useSetRecoilState(deleteModalState);

  const exitProject = useExitProject(channelId, channelList);
  let [isOpen, setIsOpen] = useState(false);
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div css={styles.projectNameBox}>
      <InviteModal />
      <ProjectDeleteForm channelId={channelId} />
      <div
        onClick={onClickHandler}
        className="relative inline-block text-left w-[200px]"
      >
        <div css={styles.modalBackground(isOpen)}></div>
        <div className="group inline-flex w-full justify-center cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <p>{channelName}</p>
          <ChevronDownIcon
            className="ml-auto -mr-1 h-5 w-5 text-black-200 group-hover:text-violet-100 text-right"
            aria-hidden="true"
          />
        </div>

        <div
          css={styles.projectNambeBoxTransition(isOpen)}
          // className="absolute right-0 mt-3 w-48 origin-top divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="px-1 py-1">
            <div className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-violet-500 hover:text-white text-gray-400">
              <button>프로젝트 정보 (예정)</button>
            </div>
            {/* <div className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-violet-500 hover:text-white text-gray-900">
              <button>button 2</button>
            </div> */}
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
