import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { channelListState } from '@/recoil/project/atom';
import axios from 'axios';
import { ProjectCreateForm } from './inputForm';
import { postEditablePage, getChannels } from '@/pages/api/editable/';
import { postSocketPage } from '@/pages/api/socket/postPage';

import { useRouter } from 'next/router';
import * as styles from './styles';

export const List = () => {
  const setChannelList = useSetRecoilState(channelListState);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const channelId = router.query.id;
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const onClickHandler = async () => {
    const res = await axios.post(`http://localhost:3000/api/channel/create`);
    const { id: channelId, channelName } = res.data;
    await postEditablePage(channelId);
    await postSocketPage(channelId);
    closeModal();
    router.push(`/project/${channelId}?channelName=${channelName}`);
  };

  useEffect(() => {
    const getChannelList = async () => {
      try {
        const channelList = await getChannels(channelId);
        setChannelList(channelList);
      } catch (err) {
        console.error(err);
      }
    };
    getChannelList();
  }, []);

  const channelList = useRecoilValue(channelListState);

  // 사용자의 channel 목록 조회 API가 있어야 함
  return (
    <div css={styles.list}>
      <div>List</div>
      {channelList?.map((channel, i) => (
        <button key={i} css={styles.createBtn}>
          {channel.channelName}
        </button>
      ))}
      <button type="button" onClick={openModal} css={styles.createBtn}>
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
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    프로젝트 시작하기
                  </Dialog.Title>
                  <div className="mt-2">
                    <ProjectCreateForm onClickHandler={onClickHandler} />
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
