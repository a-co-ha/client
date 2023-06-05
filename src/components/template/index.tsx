import * as styles from './styles';
import { ErrorBoundary } from '../error-boundary/index';
import { Error } from './Error';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useCreateTemplateInPage } from '@/hooks/queries/template/useCreateTemplateInPage';
import { useGetEditablePage } from '@/hooks/queries/editable/getPage';
import {
  DragDropContext,
  DraggableLocation,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { PageInTemplate } from './PageInTemplate';
import { useEffect, useState } from 'react';
import { useUpadatePageList } from '@/hooks/queries/template/useUpdatePageList';
import useDidMountEffect from '@/hooks/useDidMountEffect';
import type { PageInPageList, TemplatePageProps } from './type';
import { ProgressGauge } from './progressGauge';
import { useParentUrlInfo } from '@/hooks/useParentUrlInfo';

const progressStatusType = ['todo', 'progress', 'complete'];
const progressTitle = ['시작 전', '진행 중', '완료'];

//FIXME: 옮기려는 라인에 박스가 없을 때 dnd동작 x => 박스 하나씩 생성후 display noen처리 해놓기?

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
  const { mutate: upatePageList } = useUpadatePageList();

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

  const reorder = (
    list: PageInPageList[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (
    source: PageInPageList[],
    destination: PageInPageList[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: Record<string, unknown> = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

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
                      <section css={styles.progressSection} key={index}>
                        <span
                          style={{
                            backgroundColor:
                              index === 0
                                ? '#fcd99f'
                                : index === 1
                                ? '#daf7ea'
                                : '#c8e5fa',
                            borderRadius: '0.5rem',
                            padding: '0.3rem',
                            display: 'inline-block',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {progressTitle[index]}
                        </span>
                        <Droppable droppableId={`${index}`}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
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
                            </div>
                          )}
                        </Droppable>
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
