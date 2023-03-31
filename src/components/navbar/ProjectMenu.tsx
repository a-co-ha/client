import { useRouter } from 'next/router';
import * as styles from './styles';
import { useRecoilValue } from 'recoil';
import { channelNameState, channelListState } from '@/recoil/project/atom';
import { useDeleteProject } from '@/hooks/queries/project/deleteProject';
import { adminState } from '@/recoil/user/atom';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { InviteModal } from './inviteModal';

export const ProjectMenu = () => {
  const router = useRouter();
  const channelId = router.query.id;
  const channelName = useRecoilValue(channelNameState);
  const channelList = useRecoilValue(channelListState);
  const isAdmin = useRecoilValue(adminState(channelId));
  const deleteProject = useDeleteProject(channelId, channelList);

  const onClickHandler = () => {};

  return (
    <div css={styles.projectNameBox}>
      <Menu as="div" className="relative inline-block text-left w-[200px] z-50">
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
              <Menu.Item>
                <InviteModal />
              </Menu.Item>
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
      </Menu>
    </div>
  );
};
