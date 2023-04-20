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
import type { PageInPageList, TemplatePageProps } from './type';
import useDidMountEffect from '@/hooks/useDidMountEffect';

// progress-page type [todo complete progress]
/**
 * 고려사항
 * template-normal 페이지
 */

export const TemplatePage = ({
  channelId,
  pageId,
  type,
}: TemplatePageProps) => {
  //FIXME: createPage 후 새로고침해야 불러와짐 pageList에는 값이있음..
  const { mutate: createPage } = useCreateTemplateInPage();
  const { data: pageList } = useGetEditablePage(channelId, pageId, type);
  console.log('🚀 ~ file: index.tsx:34 ~ pageList:', pageList);
  const [pageArr, setPageArr] = useState(pageList);
  console.log('🚀 ~ file: index.tsx:36 ~ pageArr:', pageArr);
  const pagesId = pageArr?.map((page: PageInPageList) => page._id);
  const { mutate: updatePageList } = useUpadatePageList(pagesId);

  useDidMountEffect(() => {
    setPageArr(pageList);
    updatePageList();
  }, [pageArr, pageList]);

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) {
      return;
    }
    const updatePages = [...pageArr];
    const removedBlocks = updatePages.splice(source.index, 1);
    updatePages.splice(destination.index, 0, removedBlocks[0]);
    updatePages && setPageArr(updatePages);
  };

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={Error} onReset={reset}>
          <main css={styles.progressContainer}>
            <section css={styles.progressSection}>
              <h3>todo</h3>
              <DragDropContext onDragEnd={onDragEndHandler}>
                <Droppable key={pageId} droppableId={pageId}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {pageArr &&
                        pageArr.map((page: PageInPageList) => {
                          const position = pageList
                            .map((page: PageInPageList) => page._id)
                            .indexOf(page._id);
                          return (
                            <PageInTemplate
                              key={page._id}
                              channelId={channelId}
                              pageId={page._id}
                              pageName={page.pageName}
                              type={page.type}
                              position={position}
                            />
                          );
                        })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <button onClick={() => createPage()}>+ 새로 만들기</button>
            </section>
            <section css={styles.progressSection}>
              <h3>progress</h3>
            </section>
            <section css={styles.progressSection}>
              <h3>complete</h3>
            </section>
          </main>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
