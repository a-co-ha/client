import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useLayoutEffect, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  channelListState,
  channelNameState,
  channelImageState,
} from '@/recoil/project/atom';
import { initialUserState } from '@/recoil/user/atom';
import { ProjectCreateForm } from './CreateForm';
import { useGetUser } from '@/hooks/queries/user/getUser';
import { HoverModal } from '@/hooks/useHoverModal';
import { useRouter } from 'next/router';
import Image from 'next/image';
import githubChannelImg from '@/images/github_channel.png';
import * as styles from './styles';
import type { ChannelList } from '@/pages/api/user/type';

export const List = () => {
  const router = useRouter();
  const channelId = router.query.id;

  const [channelList, setChannelList] = useRecoilState(channelListState);
  const setChannelName = useSetRecoilState(channelNameState);
  const setChannelImage = useSetRecoilState(channelImageState);
  const setIsInitialUser = useSetRecoilState(initialUserState);

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
            orgGithubName: e.orgGithubName,
          });
        });
        setChannelList(channels);
        setIsInitialUser(false);
        const channelName = channels.filter(
          (e) => channelId === String(e.id)
        )[0].channelName;
        setChannelName(channelName);
      } else {
        setChannelList([]);
        setIsInitialUser(true);
      }
    } catch (err) {
      console.error(err);
    }
  }, [userData]);

  console.log('채널리스트 ', channelList);

  const onClickHandler = (channelData: ChannelList) => {
    setChannelName(channelData.channelName);
    setChannelImage(channelData.channelImg);
    console.log(channelData.channelName);
    router.push(`/project/${channelData.id}`);
  };

  return (
    <div css={styles.list}>
      {channelList.map((channel) => (
        <div
          key={channel.id}
          css={styles.projectCreateThumbnail(
            String(channel.id) === channelId ? true : false
          )}
        >
          <HoverModal content={channel.channelName} />
          <button
            css={{ position: `relative`, width: `100%`, height: `100%` }}
            onClick={() => onClickHandler(channel)}
          >
            <Image
              src={channel.channelImg ? channel.channelImg : githubChannelImg}
              fill
              sizes="40px"
              alt={`channelImg`}
              placeholder="blur"
              blurDataURL={`...Loading`}
              style={{ borderRadius: `10px` }}
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
