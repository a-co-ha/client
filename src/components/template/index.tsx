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

// FIXME: 페이지 이름 수정후 url 변경시에도 수정되야함
// TODO: 각 페이지 hover 시 태그 된 사람 보여주도록 구현

const progressStatusType = ['todo', 'progress', 'complete'];

export const TemplatePage = ({
  channelId,
  pageId,
  type,
}: TemplatePageProps) => {
  const { mutate: createPage } = useCreateTemplateInPage();
  const { data: pageList } = useGetEditablePage(channelId, pageId, type);

  const groupPageList = progressStatusType.map((status) =>
    pageList?.filter((page: PageInPageList) => page.progressStatus === status)
  );

  const [pageArr, setPageArr] = useState(groupPageList);
  console.log('🚀 ~ file: index.tsx:36 ~ pageArr:', pageArr);

  const PageIdList = pageList?.map((page: PageInPageList) => page._id);
  const { mutate: upatePageList } = useUpadatePageList();

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
      const newStateId = newState
        .map((pages) => pages.map((page: PageInPageList) => page._id))
        .flat();
      newState[sInd] = items;
      setPageArr(newState);

      upatePageList(newStateId);
    } else {
      const result = move(pageArr[sInd], pageArr[dInd], source, destination);
      const newState = [...pageArr];
      const newStatePageId = newState
        .map((el) => el.map((page: PageInPageList) => page._id))
        .flat();
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      setPageArr(newState.filter((group) => group.length));

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
          <main css={styles.progressContainer}>
            <DragDropContext onDragEnd={onDragEndHandler}>
              {pageList &&
                pageArr &&
                pageArr.map((el: PageInPageList[], index) => {
                  return (
                    <section css={styles.progressSection} key={index}>
                      <h3>{progressStatusType[index]}</h3>
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
                      <button
                        onClick={() => createPage(progressStatusType[index])}
                      >
                        + 새로 만들기
                      </button>
                    </section>
                  );
                })}
            </DragDropContext>
          </main>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
