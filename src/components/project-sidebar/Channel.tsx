import { useRecoilState } from 'recoil';
import { pageListState } from '@/recoil/project/atom';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { Modal } from './modal';
import { PageNameForm } from './PageNameForm';
import { PageNameLink } from './PageNameLink';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGetChannelPages } from '@/hooks/queries/editable/getPages';
import * as styles from './styles';

/** 여기서 채널 간단목록 조회 api 쏨 */
export const Channel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageList, setPageList] = useRecoilState(pageListState);
  const router = useRouter();
  const channelId = router.query.id;
  const { data: pages } = useGetChannelPages(channelId);

  const socketPageList = pageList.SocketPage.filter(
    (pageList) => pageList.room.categories === 'socket'
  );
  useEffect(() => {
    try {
      console.log(pages);
      if (pages !== undefined) {
        setPageList(pages);
      }
    } catch (err) {
      console.error(err);
    }
  }, [pages]);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  console.log(pageList);
  const editablePageList = pageList.EditablePage.filter(
    (pageList) => pageList.page.categories === 'page'
  );
  console.log(editablePageList);

  return (
    <div css={styles.channel}>
      <div>channel</div>
      {/* 템플릿 선택 모달 */}
      <Modal isOpen={isOpen} closeModal={closeModal} />
      <div className="w-full px-4 pt-16">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <div css={styles.pageCreateBtnBox}>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>노션채널</span>
                    <ChevronUpIcon
                      className={`z-0 ${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <button
                    css={styles.pageCreateBtn}
                    onClick={() => openModal()}
                  >
                    +
                  </button>
                </div>
                <Disclosure.Panel className="flex-col items-between px-4 pt-4 pb-2 text-sm text-gray-500">
                  {editablePageList.map((pageList) => {
                    return (
                      <div key={pageList.page._id}>
                        <PageNameForm
                          // key={page.page._id}
                          channelId={channelId}
                          pageId={pageList.page._id}
                          pageName={pageList.page.pageName}
                        />
                        <PageNameLink
                          channelId={channelId}
                          pageId={pageList.page._id}
                          pageName={pageList.page.pageName}
                          type={pageList.page.type}
                        />
                      </div>
                    );
                  })}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2" defaultOpen>
            {({ open }) => (
              <>
                <div css={styles.pageCreateBtnBox}>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>채팅 채널</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <button
                    css={styles.pageCreateBtn}
                    onClick={() => openModal()}
                  >
                    +
                  </button>
                </div>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {socketPageList.map((pageList) => {
                    return (
                      <div key={pageList.room._id}>
                        <PageNameForm
                          // key={page._id}
                          channelId={channelId}
                          pageId={pageList.room._id}
                          pageName={pageList.room.roomName}
                        />
                        <PageNameLink
                          channelId={channelId}
                          pageId={pageList.room._id}
                          pageName={pageList.room.roomName}
                          type={pageList.room.type}
                        />
                      </div>
                    );
                  })}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  );
};
