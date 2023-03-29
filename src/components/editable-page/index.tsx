import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import routeChangeStart from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { handlers } from './handlers';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import Label from '../editable-block/Label';
import { EditableBlock } from '@/components/editable-block';
import { Notice } from '../notice/index';
import { usePrevious } from '../../hooks/usePrevious';
import {
  blocksState,
  currentBlockIdState,
  currentUrlState,
} from '@/recoil/editable-block/atom';
import * as styles from './styles';
import type { AddBlock, EditablePages, Block } from './type';
import { ErrorBoundary } from '../error-boundary/index';
import { Error } from '../error-boundary/Error';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

export const EditablePage = ({ id, fetchedBlocks, err }: EditablePages) => {
  if (err) {
    toast.error(`예기치못한 에러가 발생했어요!`);
    return null;
    // return <Notice status="ERROR" />;
  }
  console.log(`펫취드 블락스`, fetchedBlocks);
  const [blocks, setBlocks] = useRecoilState(blocksState(id));

  console.log('블락스', blocks);
  useEffect(() => {
    setBlocks(fetchedBlocks);
  }, [setBlocks]);
  const [_, setCurrentBlockId] = useRecoilState(currentBlockIdState);
  const router = useRouter();
  const channelId = router.query.id;
  useEffect(() => {
    console.log(`리턴 직후`);
    handlers.updatePageOnserver(blocks, id, channelId);
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

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={Error} onReset={reset}>
          <div css={styles.contentBox}>
            {isNewPage && <Notice status="SUCCESS" />}
            {/* <Label /> */}
            <DragDropContext onDragEnd={onDragEndHandler}>
              <Droppable key={id} droppableId={id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {blocks.map((block) => {
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
                          pageId={id}
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
