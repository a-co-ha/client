import { useState, useEffect, useMemo, useRef } from 'react';
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
  // return <Notice status="ERROR" />;
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [_, setCurrentBlockId] = useRecoilState(currentBlockIdState);
  const router = useRouter();
  const page = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setBlocks(fetchedBlocks);
  }, [fetchedBlocks, pageId]);

  useDidMountEffect(() => {
    if (fetchedBlocks !== blocks) {
      handlers.updatePageOnserver(blocks, pageId, channelId);
    }
    const contentElement = page.current;
    if (contentElement) contentElement.scrollTop = contentElement.scrollHeight;
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
          <div css={styles.contentBox} ref={page}>
            {isNewPage && <Notice status="SUCCESS" />}
            <Label />
            <DragDropContext onDragEnd={onDragEndHandler}>
              <Droppable key={pageId} droppableId={pageId}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {blocks &&
                      blocks.map((block) => {
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
