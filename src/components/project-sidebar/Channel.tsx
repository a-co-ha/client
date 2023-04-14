import { useRecoilState } from 'recoil';
import { pageListState } from '@/recoil/project/atom';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { SelectTemplete } from './SelectTemplete';
import { PageNameForm } from './PageNameForm';
import { PageNameLink } from './PageNameLink';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGetChannelPages } from '@/hooks/queries/editable/getPages';
import * as styles from './styles';

import { Popover } from '@headlessui/react';

/** 여기서 채널 간단목록 조회 api 쏨 */

type pageListTypeT = 'EditablePage';

const pageListType = ['EditablePage'];

export const Channel = () => {
  const [pageList, setPageList] = useRecoilState(pageListState);
  console.log('🚀 ~ file: Channel.tsx:18 ~ Channel ~ pageList:', pageList);
  const router = useRouter();
  const channelId = router.query.id;
  const { data: pages } = useGetChannelPages(channelId);
  console.log('🚀 ~ file: Channel.tsx:27 ~ Channel ~ pages:', pages);

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

  const editablePageList = pageList.EditablePage.filter(
    (pageList) => pageList.page.categories === 'page'
  );

  return (
    <div css={styles.channel}>
      <div>channel</div>
      {/* 템플릿 선택 모달 */}
      <div className="w-full px-4 pt-16">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
          {pageListType.map((pageType) => {
            return (
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
                      <div css={styles.pageCreateBtn}>
                        <Popover className="relative">
                          <Popover.Button>
                            <span>+</span>
                          </Popover.Button>
                          <SelectTemplete />
                        </Popover>
                      </div>
                    </div>
                    <Disclosure.Panel className="flex-col items-between px-4 pt-4 pb-2 text-sm text-gray-500">
                      {pageList[pageType as pageListTypeT].map((page) => {
                        return (
                          <div key={page.page._id}>
                            <PageNameForm
                              channelId={channelId}
                              pageId={page.page._id}
                              pageName={page.page.pageName}
                            />
                            <PageNameLink
                              channelId={channelId}
                              pageId={page.page._id}
                              pageName={page.page.pageName}
                              type={page.page.type}
                            />
                          </div>
                        );
                      })}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            );
          })}
          {/* 
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
                  <div css={styles.pageCreateBtn}>
                    <Popover className="relative">
                      <>
                        <Popover.Button>
                          <span>+</span>
                        </Popover.Button>
                        <SelectTemplete />
                      </>
                    </Popover>
                  </div>
                </div>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {socketPageList.map((pageList) => {
                    return (
                      <div key={pageList.room._id}>
                        <PageNameForm
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
          </Disclosure> */}
        </div>
      </div>
    </div>
  );
};
