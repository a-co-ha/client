import { useRouter } from 'next/router';
import * as styles from './styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  channelNameState,
  channelListState,
  deleteModalState,
} from '@/recoil/project/atom';
import { useDeleteProject } from '@/hooks/queries/project/deleteProject';
import { useExitProject } from '@/hooks/queries/project/exitProject';
import { useState } from 'react';
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
      <ProjectDeleteForm channelId={channelId} channelList={channelList} />
      <div
        onClick={onClickHandler}
        className="relative inline-block text-left w-[200px] z-10"
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
            <div className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-violet-500 hover:text-white text-gray-900">
              <button>button 1</button>
            </div>
            <div className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-violet-500 hover:text-white text-gray-900">
              <button>button 2</button>
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
  /* <Menu as="div" className="relative inline-block text-left w-[200px] z-50">
  <div>
    <Menu.Button className="group inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      <p>{channelName}</p>
      <ChevronDownIcon
        className="ml-auto -mr-1 h-5 w-5 text-black-200 group-hover:text-violet-100 text-right"
        aria-hidden="true"
      />
    </Menu.Button>
  </div>
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="px-1 py-1 ">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-violet-500 text-white' : 'text-gray-900'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              {active ? null : null}
              Edit
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-violet-500 text-white' : 'text-gray-900'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              {active ? null : null}
              Duplicate
            </button>
          )}
        </Menu.Item>
      </div>
      <div className="px-1 py-1">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? 'bg-violet-500 text-white' : 'text-gray-900'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              {active ? null : null}
              Archiv
            </button>
          )}
        </Menu.Item>
        {channelList.length !== 0 ? (
          <Menu.Item>
            {({ close }) => (
              <button>
                dsa
                {!close ? null : null}
              </button>
            )}
          </Menu.Item>
        ) : null}
      </div>
      <div className="px-1 py-1">
        {isAdmin ? (
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => deleteProject.mutate()}
                className={`${
                  active ? 'bg-violet-500 text-white' : 'text-red-600'
                } group flex w-full items-center rounded-md px-2 py-2  text-sm`}
              >
                프로젝트 삭제하기
              </button>
            )}
          </Menu.Item>
        ) : null}
      </div>
    </Menu.Items>
  </Transition>
</Menu>; */
}
