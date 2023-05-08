import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { handlers } from './handlers';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Label from '../editable-block/Label';
import { useGetEditablePage } from '@/hooks/queries/editable/getPage';
import { EditableBlock } from '@/components/editable-block';
import { Notice } from '../notice/index';
import { currentBlockIdState } from '@/recoil/editable-block/atom';
import * as styles from './styles';
import type { AddBlock, EditablePages, Block } from './type';
import { ErrorBoundary } from '../error-boundary/index';
import { Error } from '../error-boundary/Error';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import useDidMountEffect from '@/hooks/useDidMountEffect';

export const EditablePage = ({ channelId, pageId, type }: EditablePages) => {
  const { data: fetchedBlocks } = useGetEditablePage(channelId, pageId, type);
  console.log(
    '🚀 ~ file: index.tsx:20 ~ EditablePage ~ fetchedBlocks:',
    fetchedBlocks
  );
  // return <Notice status="ERROR" />;
  const [blocks, setBlocks] = useState<Block[]>([]);
  console.log('🚀 ~ file: index.tsx:22 ~ EditablePage ~ blocks:', blocks);
  const [_, setCurrentBlockId] = useRecoilState(currentBlockIdState);
  const router = useRouter();
  // 여기까지 돌아오기
  useEffect(() => {
    console.log(
      '🚀 ~ file: index.tsx:34 ~ useEffect ~ fetchedBlocks:',
      fetchedBlocks
    );
    fetchedBlocks && setBlocks(fetchedBlocks);
  }, [router.query.pageId, fetchedBlocks]);

  useDidMountEffect(() => {
    console.log(
      '🚀 ~ file: index.tsx:36 ~ useDidMountEffect ~ blocks:',
      blocks
    );
    handlers.updatePageOnserver(blocks, pageId, channelId);
  }, [blocks]);

  const addBlockHandler = (currentBlock: AddBlock) => {
    setCurrentBlockId(currentBlock.id);
    const updatedBlocks = handlers.addBlock(blocks, currentBlock);
    setBlocks(updatedBlocks);
  };

  const updateBlockHandler = (currentBlock: Block) => {
    const updatedBlocks = handlers.updateBlock(blocks, currentBlock);
    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (currentBlockId: string) => {
    const updatedBlocks = handlers.deleteBlock(blocks, currentBlockId);
    updatedBlocks && setBlocks(updatedBlocks);
  };

  const onDragEndHandler = (result: DropResult) => {
    const updatedBlocks = handlers.onDragEnd(blocks, result);
    updatedBlocks && setBlocks(updatedBlocks);
  };
  const isNewPage = router.query.initial === 'true';
  console.log('EditablePage 랜더링');
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={Error} onReset={reset}>
          <div css={styles.contentBox}>
            {isNewPage && <Notice status="SUCCESS" />}
            <Label />
            <DragDropContext onDragEnd={onDragEndHandler}>
              <Droppable key={pageId} droppableId={pageId}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {blocks?.map((block) => {
                      const position = blocks
                        .map((b) => b.blockId)
                        .indexOf(block.blockId);
                      return (
                        <EditableBlock
                          key={block.blockId}
                          position={position}
                          id={block.blockId}
                          tag={block.tag}
                          html={block.html}
                          imgUrl={block.imgUrl}
                          pageId={pageId}
                          addBlock={addBlockHandler}
                          updateBlock={updateBlockHandler}
                          deleteBlock={deleteBlockHandler}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
