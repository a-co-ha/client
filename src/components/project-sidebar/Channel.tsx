import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  pageListState,
  channelSidebarOpenState,
  channelMobileRightSidebarOpenState,
} from '@/recoil/project/atom';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { SelectTemplate } from './SelectTemplate';
import { PageNameForm } from './PageNameForm';
import { PageNameLink } from './PageNameLink';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGetChannelPages } from '@/hooks/queries/editable/getPages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import * as styles from './styles';
import { Popover } from '@headlessui/react';

type pageListTypeT = 'EditablePage' | 'SocketPage';
export interface IpageListType {
  type: 'EditablePage' | 'SocketPage';
  title: string;
}
export const pageListType: IpageListType[] = [
  { type: 'EditablePage', title: '일반' },
  { type: 'SocketPage', title: '채팅' },
];

/** 여기서 채널 간단목록 조회 api 쏨 */
export const Channel = () => {
  const [pageList, setPageList] = useRecoilState(pageListState);
  const [isChannelSidebarOpen, setIsChannelSidebarOpen] = useRecoilState(
    channelSidebarOpenState
  );
  const setIsChannelRightSidebarOpen = useSetRecoilState(
    channelMobileRightSidebarOpenState
  );
  const router = useRouter();
  const channelId = router.query.id;
  const { data: pages } = useGetChannelPages(channelId);

  useEffect(() => {
    pages && setPageList(pages);
  }, [pages]);

  useEffect(() => {
    if (window !== undefined) {
      window.innerWidth <= 450 ? setIsChannelSidebarOpen(false) : null;
    }
  }, []);

  const onClickHandler = () => {
    if (isChannelSidebarOpen) {
      setIsChannelSidebarOpen(false);
    } else {
      setIsChannelRightSidebarOpen(false);
      setIsChannelSidebarOpen(true);
    }
  };

  return (
    <div css={styles.channel(isChannelSidebarOpen)}>
      <button
        css={styles.channelSidbarMoreBtn(isChannelSidebarOpen)}
        onClick={onClickHandler}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="xs" />
      </button>
      {/* 템플릿 선택 모달 */}
      <div className="w-full px-2 pt-16">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white bg-transparent">
          {pageListType.map((pageType: IpageListType, index) => {
            return (
              <Disclosure key={index} defaultOpen>
                {({ open }) => (
                  <>
                    <div css={styles.pageCreateBtnBox}>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white-100 px-2 py-2 text-left text-sm font-medium text-indigo-950 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>{pageType.title}</span>
                        <ChevronUpIcon
                          className={`z-0 ${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-indigo-950`}
                        />
                      </Disclosure.Button>
                      <Popover className="relative">
                        <Popover.Button css={styles.pageCreateBtn}>
                          +
                        </Popover.Button>
                        <SelectTemplate pageType={pageType.type} />
                      </Popover>
                    </div>
                    <Disclosure.Panel className="flex-col items-between px-4 pt-4 pb-2 text-sm text-gray-500">
                      {pageList[pageType.type as pageListTypeT].map(
                        (pageList) => {
                          if (!pageList.page && !pageList.template) {
                            return;
                          }
                          const {
                            _id: pageId,
                            pageName,
                            type,
                          } = pageList.page || pageList.template;
                          return (
                            <div key={pageId}>
                              <PageNameForm
                                channelId={channelId}
                                pageId={pageId}
                                pageName={pageName}
                                type={type}
                              />
                              <PageNameLink
                                channelId={channelId}
                                pageId={pageId}
                                pageName={pageName}
                                type={type}
                              />
                            </div>
                          );
                        }
                      )}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            );
          })}
        </div>
      </div>
    </div>
  );
};
