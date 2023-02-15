import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  updatePageOnserver,
  addBlock,
  updateBlock,
  deleteBlock,
  onDragEnd,
} from './handlers';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { usePrevious } from '@/hooks/usePrevious';
import { EditableBlock } from '@/components/editableBlock';
import { blocksState, currentBlockIdState } from '@/recoil/editableBlock/atom';
import type { AddBlock, page, block, DropResult } from '../editablePage/types';

export const EditablePage = ({ id, fetchedBlocks, err }: page) => {
  const [blocks, setBlocks] = useRecoilState(blocksState);
  setBlocks(fetchedBlocks);
  const [currentBlockId, setCurrentBlockId] =
    useRecoilState(currentBlockIdState);
  const prevBlcoks = usePrevious(blocks);

  //block 변화시 put
  useEffect(() => {
    updatePageOnserver(blocks, id);
    prevBlcoks && prevBlcoks !== blocks ? updatePageOnserver(blocks, id) : null;
  }, [blocks, prevBlcoks]);

  //block 삭제시 커서를 전 블럭 끝으로 위치
  useEffect(() => {});

  const addBlockHandler = (currentBlock: AddBlock) => {
    setCurrentBlockId(currentBlock.id);
    const updatedBlocks = addBlock(blocks, currentBlock);
    setBlocks(updatedBlocks);
  };

  const updateBlockHandler = (currentBlock: block) => {
    const updatedBlocks = updateBlock(blocks, currentBlock);
    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (currentBlockId: string) => {
    const updatedBlocks = deleteBlock(blocks, currentBlockId);
    setBlocks(updatedBlocks);
  };

  const onDragEndHandler = (result: DropResult) => {
    const updatedBlocks = onDragEnd(blocks, result);
    updatedBlocks && setBlocks(updatedBlocks);
  };

  console.log('blocks', id, blocks);
  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Droppable droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {blocks.map((block) => {
              const position = blocks.map((b) => b._id).indexOf(block._id) + 1;
              return (
                <EditableBlock
                  key={block._id}
                  position={position}
                  id={block._id}
                  tag={block.tag}
                  html={block.html}
                  imageUrl={block.imageUrl}
                  pageId={id}
                  addBlock={addBlockHandler}
                  updateBlock={updateBlockHandler}
                  deleteBlock={deleteBlockHandler}
                ></EditableBlock>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
