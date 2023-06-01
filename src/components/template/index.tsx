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
import { useGetUrlInfo } from '@/hooks/useGetUrlInfo';

const progressStatusType = ['todo', 'progress', 'complete'];

export const TemplatePage = ({
  channelId,
  pageId,
  type,
}: TemplatePageProps) => {
  console.log("🚀 ~ file: index.tsx:28 ~ type:", type)
  const { mutate: createPage } = useCreateTemplateInPage(
    channelId,
    pageId,
    type
  );
  console.log('🚀 ~ file: index.tsx:199 ~parentPageId pageId:', pageId);
  //FIXME: pageId값이 처음에 있는데 2,3번쨰 없다가 다시 생김
  const { data: pageList } = useGetEditablePage(channelId, pageId, type);
  const groupPageList = progressStatusType.map((status) =>
    pageList?.filter((page: PageInPageList) => page.progressStatus === status)
  );
  const [pageArr, setPageArr] = useState(groupPageList);
  const PageIdList = pageList?.map((page: PageInPageList) => page._id);
  const { mutate: upatePageList } = useUpadatePageList();
  // const [parentPageId, setParentPageId] = useState('');
  const { type: isRenderPage } = useGetUrlInfo();
  // FIXME: true/false로 값 지정하기
  // FIXME: 템플릿 안 페이지가 있는 상태에서 dnd 시 탬플릿 페이지 사라짐

  useEffect(() => {
    if (isRenderPage == 'template-progress') {
      localStorage.setItem('parentPageId', pageId);
    }
  }, []);
  /**
   *
   * TODO: 전역상태로 parentPageId 저장하면 안되는 이유
   * 템플릿 안 페이지에서 새로고침 시 전역상태로 저장된 pageId가 현재페이지 id로 바뀜
   * get하면 템플릿 페이지 뜨지않음
   *
   */

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
          </div>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
