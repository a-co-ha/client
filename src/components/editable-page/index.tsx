import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import {
  updatePageOnserver,
  addBlock,
  updateBlock,
  deleteBlock,
  onDragEnd,
} from './handlers';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { usePrevious } from '@/hooks/usePrevious';
import { EditableBlock } from '@/components/editable-block';
import { blocksState, currentBlockIdState } from '@/recoil/editable-block/atom';
import { Notice } from '@/components/notice';
import type { AddBlock, EditablePages, Block } from '../editable-page/types';

export const EditablePage = ({ id, fetchedBlocks, err }: EditablePages) => {
  if (err) {
    return <Notice status="ERROR" />;
  }
  const [blocks, setBlocks] = useRecoilState(blocksState);
  console.log(blocks);
  useEffect(() => {
    setBlocks(fetchedBlocks);
  }, []);
  const [_, setCurrentBlockId] = useRecoilState(currentBlockIdState);
  const prevBlcoks = usePrevious(blocks);
  const router = useRouter();

  //block 변화시 put
  useEffect(() => {
    updatePageOnserver(blocks, id);
    prevBlcoks && prevBlcoks !== blocks ? updatePageOnserver(blocks, id) : null;
  }, [blocks, prevBlcoks]);

  const addBlockHandler = (currentBlock: AddBlock) => {
    setCurrentBlockId(currentBlock.id);
    const updatedBlocks = addBlock(blocks, currentBlock);
    setBlocks(updatedBlocks);
  };

  const updateBlockHandler = (currentBlock: Block) => {
    const updatedBlocks = updateBlock(blocks, currentBlock);
    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (currentBlockId: string) => {
    const updatedBlocks = deleteBlock(blocks, currentBlockId);
    updatedBlocks && setBlocks(updatedBlocks);
  };

  const onDragEndHandler = (result: DropResult) => {
    const updatedBlocks = onDragEnd(blocks, result);
    updatedBlocks && setBlocks(updatedBlocks);
  };
  const isNewPage = router.query.public === 'true';

  return (
    <>
      {isNewPage && <Notice status="SUCCESS" />}
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
                    imageUrl={block.imageUrl}
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
    </>
  );
};
