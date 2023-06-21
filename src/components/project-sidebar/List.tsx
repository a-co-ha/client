import { useGetUser } from '@/hooks/queries/user/getUser';
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';
import { HoverModal } from '@/hooks/useHoverModal';
import githubChannelImg from '@/images/github_channel.png';
import type { ChannelList } from '@/pages/api/user/type';
import {
  channelImageState,
  channelListState,
  channelMobileRightSidebarOpenState,
  channelNameState,
} from '@/recoil/project/atom';
import { initialUserState } from '@/recoil/user/atom';
import { messageStatusState } from '@/recoil/socket/atom';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useLayoutEffect, useState } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { ProjectCreateForm } from './CreateForm';
import * as styles from './styles';

export const List = () => {
  const router = useRouter();
  const { channelId } = useGetUrlInfo();

  const [channelList, setChannelList] = useRecoilState(channelListState);
  const resetChannelList = useResetRecoilState(channelListState);
  const setChannelName = useSetRecoilState(channelNameState);
  const setChannelImage = useSetRecoilState(channelImageState);
  const setIsInitialUser = useSetRecoilState(initialUserState);
  const messageStatus = useRecoilValue(messageStatusState);
  const [readChannel, setReadChannel] = useState(['']);
  const setIsChannelRightSidebarOpen = useSetRecoilState(
    channelMobileRightSidebarOpenState
  );
  const [isOpen, setIsOpen] = useState(false);
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
            repoName: e.repoName,
            repoType: e.repoType,
          });
        });
        setChannelList(channels);
        setIsInitialUser(false);
      } else {
        resetChannelList();
        setIsInitialUser(true);
        setChannelName('');
      }
    } catch (err) {
      console.error(err);
    }
  }, [userData]);
  useLayoutEffect(() => {
    const newArr: string[] = [];
    const unReadRoomArray = messageStatus.filter((room) => {
      const unReadRoom = room.status.isRead === false;
      return unReadRoom;
    });
    unReadRoomArray.map((room) => {
      newArr.push(String(room.channelId.channelId));
    });

    const set = [...new Set(newArr)];
    setReadChannel(set);
  }, [messageStatus]);

  console.log('채널리스트 ', channelList);

  const onClickHandler = (channelData: ChannelList) => {
    setChannelName(channelData.channelName);
    setChannelImage(channelData.channelImg);
    console.log(channelData.channelName);
    router.push(`/project/${channelData.id}`);
    if (window) {
      window.innerWidth <= 450 ? setIsChannelRightSidebarOpen(false) : null;
    }
  };

  return (
    <div css={styles.list}>
      {channelList.map((channel) => (
        <div
          key={channel.id}
          css={styles.projectCreateThumbnail(
            String(channel.id) === channelId ? true : false,
            readChannel.indexOf(String(channel.id)) !== -1
          )}
          onClick={() => onClickHandler(channel)}
        >
          <HoverModal content={channel.channelName} />
          <svg
            width="40"
            height="40"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path
                id="listSquircle"
                d="M50 25C50 43.4095 43.4095 50 25 50C6.59051 50 0 43.4095 0 25C0 6.59051 6.59051 0 25 0C43.4095 0 50 6.59051 50 25Z"
              ></path>
              <clipPath id="listClipSquircle">
                <use xlinkHref="#listSquircle" />
              </clipPath>
            </defs>
            <image
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#listClipSquircle)"
              xlinkHref={`${
                channel.channelImg ? channel.channelImg : githubChannelImg.src
              }`}
            />
          </svg>
          <div></div>
        </div>
      ))}
      <button
        type="button"
        onClick={openModal}
        css={styles.projectCreatePlusBtn}
      >
        +
        <HoverModal content={`프로젝트 생성하기`} />
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
