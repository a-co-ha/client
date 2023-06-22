import * as styles from './styles';
import { ErrorBoundary } from '../error-boundary/index';
import { Error } from './Error';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useCreateTemplateInPage } from '@/hooks/queries/template/useCreateTemplateInPage';
import { useGetEditablePage } from '@/hooks/queries/editable/getPage';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { PageInTemplate } from './PageInTemplate';
import { useEffect, useState } from 'react';
import { useUpadatePageList } from '@/hooks/queries/template/useUpdatePageList';
import useDidMountEffect from '@/hooks/useDidMountEffect';
import type { PageInPageList, TemplatePageProps } from './type';
import { ProgressGauge } from './progressGauge';
import { useParentUrlInfo } from '@/hooks/useParentUrlInfo';
import { move, reorder } from './templateDragaAndDrop';

const progressStatusType = ['todo', 'progress', 'complete'];
const progressTitle = ['시작 전', '진행 중', '완료'];

export const TemplatePage = ({
  channelId,
  pageId,
  type,
}: TemplatePageProps) => {
  const { mutate: createPage } = useCreateTemplateInPage(
    channelId,
    pageId,
    type
  );
  const { data: pageList } = useGetEditablePage(channelId, pageId, type);
  const groupPageList = progressStatusType.map((status) =>
    pageList?.filter((page: PageInPageList) => page.progressStatus === status)
  );
  const [pageArr, setPageArr] = useState(groupPageList);
  const PageIdList = pageList?.map((page: PageInPageList) => page._id);
  const { mutate: upatePageList } = useUpadatePageList(channelId, pageId, type);

  // useRouter query type이 template으로 시작할떄만 값가져오기
  useParentUrlInfo(channelId);

  useEffect(() => {
    localStorage.setItem('parentPageId', pageId);
  }, []);

  useEffect(() => {
    upatePageList(PageIdList);
  }, []);

  useDidMountEffect(() => {
    setPageArr(groupPageList);
  }, [pageList]);

  function onDragEndHandler(result: DropResult) {
    const { source, destination } = result;
    const targetId = result.draggableId;
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(pageArr[sInd], source.index, destination.index);
      const newState = [...pageArr];

      newState[sInd] = items;
      setPageArr(newState);
      const newStateId = newState
        .map((pages) => pages.map((page: PageInPageList) => page._id))
        .flat();

      upatePageList(newStateId);
    } else {
      const result = move(pageArr[sInd], pageArr[dInd], source, destination);
      const newState = [...pageArr];

      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      setPageArr(newState.filter((group) => group.length));
      const newStatePageId = newState
        .map((el) => el.map((page: PageInPageList) => page._id))
        .flat();

      progressStatusType.forEach((status, index) => {
        if (dInd === index) {
          const statusWithPageList = newStatePageId.map((pageId: string) => {
            if (pageId === targetId) {
              return { _id: pageId, progressStatus: status };
            } else {
              return pageId;
            }
          });
          upatePageList(statusWithPageList);
        }
      });
    }
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={Error} onReset={reset}>
          <div css={styles.mainContainer} style={{ width: '40%' }}>
            <ProgressGauge pageId={pageId} />
            <main css={styles.progressContainer}>
              <DragDropContext onDragEnd={onDragEndHandler}>
                {pageList &&
                  pageArr.length === 3 &&
                  pageArr.map((el: PageInPageList[], index) => {
                    return (
                      <Droppable droppableId={`${index}`}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            <section css={styles.progressSection} key={index}>
                              <span css={styles.progressStatus(index)}>
                                {progressTitle[index]}
                              </span>

                              {el &&
                                el.map((page: PageInPageList, i) => {
                                  return (
                                    <PageInTemplate
                                      key={page._id}
                                      channelId={channelId}
                                      pageId={page._id}
                                      pageName={page.pageName}
                                      type={page.type}
                                      position={i}
                                      label={page.label}
                                    />
                                  );
                                })}
                              {provided.placeholder}

                              <div className="hover:bg-gray-200 p-2 rounded-md">
                                <button
                                  onClick={() =>
                                    createPage(progressStatusType[index])
                                  }
                                >
                                  + 새로 만들기
                                </button>
                              </div>
                            </section>
                          </div>
                        )}
                      </Droppable>
                    );
                  })}
              </DragDropContext>
            </main>
          </div>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
