import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useLayoutEffect, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { channelListState, channelNameState } from '@/recoil/project/atom';
import { initialUserState } from '@/recoil/user/atom';
import { ProjectCreateForm } from './CreateForm';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { useRouter } from 'next/router';
import Image from 'next/image';
import githubChannelImg from '@/images/github_channel.png';
import * as styles from './styles';
import type { ChannelList } from '@/pages/api/user/type';

import { api } from '@/pages/api/config/api-config';

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
      const channels: ChannelList[] = [];
      if (userData !== undefined && userData.channels.length !== 0) {
        userData.channels.map((e: ChannelList) => {
          channels.push({
            id: e.id,
            userId: e.userId,
            channelName: e.channelName,
            channelImg: e.channelImg,
          });
        });
        setChannelList(channels);
        setIsInitialUser(false);
      } else {
        setChannelList([]);
        setIsInitialUser(true);
        // router.push(`/main`);
      }
    } catch (err) {
      console.error(err);
    }
  }, [userData]);

  console.log('채널리스트 ', channelList);

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    channelId: number,
    channelName: string
  ) => {
    setChannelName(channelName);
    console.log(channelName);
    router.push(`/project/${channelId}`);
  };

  const deleteAllHandler = () => {
    channelList.map((e) => {
      const channelId = e.id as unknown as string;
      api.delete(`/api/channel/admin?channel=${channelId}`);
    });
  };

  return (
    <div css={styles.list}>
      {channelList.map((channel) => (
        <div key={channel.id} css={styles.projectCreateThumbnail}>
          <button
            css={{ position: `relative`, width: `100%`, height: `100%` }}
            onClick={(e) => onClickHandler(e, channel.id, channel.channelName)}
          >
            <Image
              src={channel.channelImg ? channel.channelImg : githubChannelImg}
              fill
              sizes="40px"
              alt={`channelImg`}
              placeholder="blur"
              blurDataURL={`...Loading`}
            />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={openModal}
        css={styles.projectCreatePlusBtn}
      >
        +
      </button>
      <button
        type="button"
        onClick={deleteAllHandler}
        css={styles.listAllDelete}
      >
        임시 전체삭제
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
