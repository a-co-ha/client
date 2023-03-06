import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  selector,
} from 'recoil';
import { pageListState, pageNameState } from '@/recoil/project/atom';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { Modal } from './modal';
import { PageNameForm } from './PageNameForm';
import { getEditablePages } from '@/pages/api/editable/getPages';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import * as styles from './styles';

/** 여기서 채널 간단목록 조회 api 쏨 */
export const Channel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const setPageList = useSetRecoilState(pageListState);
  const router = useRouter();
  const channelId = router.query.id;
  useEffect(() => {
    const getEditablePageList = async () => {
      try {
        const pageList = await getEditablePages(channelId);
        setPageList(pageList);
      } catch (err) {
        console.error(err);
      }
    };
    getEditablePageList();
  }, []);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const onClickHandler = () => {
    openModal();
  };

  const pageList = useRecoilValue(pageListState);
  console.log(pageList);
  pageNameState;
  // const onChangeHandler = (e) => {

  // };
  const editablePageList = pageList.filter((page) => page.type === 'normal');
  const socketPageList = pageList.filter((page) => page.type === 'socket');
  // pageList.map(e=>)
  const [pageNames, setPageNames] = useRecoilState(pageNameState(1));

  return (
    <div css={styles.channel}>
      <div>channel</div>
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
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <button css={styles.pageCreateBtn} onClick={onClickHandler}>
                    +
                  </button>
                </div>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {editablePageList.map((page) => {
                    return (
                      <Link
                        key={page.pageId}
                        href={`/project/${channelId}/${page.pageId}?name=${page.pageName}&type=${page.type}`}
                      >
                        {page.pageName}
                      </Link>
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
                  <button css={styles.pageCreateBtn} onClick={onClickHandler}>
                    +
                  </button>
                </div>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {socketPageList.map((page) => {
                    return (
                      <Link
                        key={page.pageId}
                        href={`/project/${channelId}/${page.pageId}?name=${page.pageName}&type=${page.type}`}
                      >
                        {page.pageName}
                        {/* <input
                          css={{ border: '1px solid red', cursor: 'pointer' }}
                          type="text"
                          value={page.pageName}
                          onChange={onChangeHandler}
                        /> */}
                        {/* <PageNameForm pageId={page.pageId} > */}
                      </Link>
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
