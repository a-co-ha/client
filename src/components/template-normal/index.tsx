import * as styles from './styles';
import { ErrorBoundary } from '../error-boundary/index';
import { Error } from './Error';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useCreateTemplateInPage } from '@/hooks/queries/template/useCreateTemplateInPage';
import { useGetEditablePage } from '@/hooks/queries/editable/getPage';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { useUpadatePageList } from '@/hooks/queries/template/useUpdatePageList';
import useDidMountEffect from '@/hooks/useDidMountEffect';
import type { PageInPageList, TemplatePageProps } from './type';
import { PageInTemplate } from '../template/PageInTemplate';

export const TemplateNormalPage = ({
  channelId,
  pageId,
  type,
}: TemplatePageProps) => {
  const { mutate: createPage } = useCreateTemplateInPage();
  const { data: pageList } = useGetEditablePage(channelId, pageId, type);

  const [pageArr, setPageArr] = useState(pageList);
  console.log('🚀 ~ file: index.tsx:36 ~ pageArr:', pageArr);

  const PageIdList = pageList?.map((page: PageInPageList) => page._id);
  const { mutate: upatePageList } = useUpadatePageList();

  useEffect(() => {
    upatePageList(PageIdList);
  }, []);

  useDidMountEffect(() => {
    setPageArr(pageList);
  }, [pageList]);

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) {
      return;
    }
    const updatedBlocks = [...pageArr];
    const removedBlocks = updatedBlocks.splice(source.index, 1);
    updatedBlocks.splice(destination.index, 0, removedBlocks[0]);
    updatedBlocks && setPageArr(updatedBlocks);
  };

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={Error} onReset={reset}>
          <main css={styles.progressContainer}>
            <DragDropContext onDragEnd={onDragEndHandler}>
              <section css={styles.progressSection}>
                <Droppable droppableId={pageId}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {pageArr &&
                        pageArr.map((page: PageInPageList, i: number) => {
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
                <button onClick={() => createPage(null)}>+ 새로 만들기</button>
              </section>
            </DragDropContext>
          </main>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
