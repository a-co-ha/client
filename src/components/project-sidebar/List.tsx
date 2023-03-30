import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useLayoutEffect, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { channelListState, channelNameState } from '@/recoil/project/atom';
import { initialUserState } from '@/recoil/user/atom';
import { ProjectCreateForm } from './CreateForm';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { useRouter } from 'next/router';
import * as styles from './styles';
import type { Channels } from './type';

export const List = () => {
  const [channelList, setChannelList] = useRecoilState(channelListState);
  const setChannelName = useSetRecoilState(channelNameState);
  const setIsInitialUser = useSetRecoilState(initialUserState);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: userData } = useGetUser();
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  useLayoutEffect(() => {
    try {
      const channels: Channels[] = [];
      if (userData !== undefined && userData.channels.length !== 0) {
        userData.channels.map((e: Channels) => {
          channels.push({
            id: e.id,
            channelName: e.channelName,
          });
        });
        setChannelList(channels);
        setIsInitialUser(false);
      } else {
        setChannelList([]);
        setIsInitialUser(true);
        router.push(`/main`);
      }
    } catch (err) {
      console.error(err);
    }
  }, [userData]);

  // useLayoutEffect(() => {
  //   try {
  //     if (channelList.length === 1) {
  //       router.push(`/project/${channelList[0].id}`);
  //     } else {
  //       return;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [channelList]);

  console.log('채널리스트 ', channelList);

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    channelId: number
  ) => {
    const channelName = e.currentTarget.innerText;
    setChannelName(channelName);
    console.log(channelName);
    router.push(`/project/${channelId}`);
  };

  return (
    <div css={styles.list}>
      <div>List</div>
      {channelList.map((channel) => (
        <button
          key={channel.id}
          css={styles.ProjectCreate}
          onClick={(e) => onClickHandler(e, channel.id)}
        >
          {channel.channelName}
        </button>
      ))}
      <button type="button" onClick={openModal} css={styles.ProjectCreate}>
        +
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    css={{ boxSizing: 'border-box' }}
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    프로젝트 시작하기
                  </Dialog.Title>
                  <div className="mt-2">
                    <ProjectCreateForm closeModal={closeModal} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
