import { useRecoilValue, useSetRecoilState } from 'recoil';
import { pageListState } from '@/recoil/project/atom';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as styles from './styles';

export const Channel = () => {
  const router = useRouter();
  const setPageList = useSetRecoilState(pageListState);
  const channelId = router.query.id;
  const savedPageList = localStorage.getItem('pageList');
  useEffect(() => {
    savedPageList !== null ? setPageList(JSON.parse(savedPageList)) : null;
  }, []);
  const pageList = useRecoilValue(pageListState);
  const editablePageList = pageList.filter((page) => page.type === 'normal');
  const socketPageList = pageList.filter((page) => page.type === 'socket');
  return (
    <div css={styles.channel}>
      <div>channel</div>
      <div className="w-full px-4 pt-16">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>노션 채널</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {editablePageList.map((page) => {
                    return (
                      <Link
                        key={page.pageId}
                        href={`/project/${channelId}/${page.pageId}?type=${page.type}`}
                      >
                        {page.pageName}
                      </Link>
                    );
                  })}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>채팅 채널</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {socketPageList.map((page) => {
                    return (
                      <Link
                        key={page.pageId}
                        href={`/project/${channelId}/${page.pageId}?type=${page.type}`}
                      >
                        {page.pageName}
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
