import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { blocksState, currnetBlockIdState } from '@/recoil/editableBlock/atom';
import {
  updatePageOnserver,
  addBlockHandler,
  updateBlockHandler,
  deleteBlockHandler,
  onDragEndHandler,
} from './handlers';
import { page } from '@/components/editablePage/types';
import { EditableBlock } from '../editableBlock';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { usePrevious } from '@/hooks/usePrevious';

export const EditablePage = ({ id, fetchedBlocks, err }: page) => {
  const [blocks, setBlocks] = useRecoilState(blocksState);
  setBlocks(fetchedBlocks);
  const [currnetBlockId, setCurrnetBlockId] =
    useRecoilState(currnetBlockIdState);
  const prevBlcoks = usePrevious(blocks);

  //block 변화시 put
  useEffect(() => {
    updatePageOnserver(blocks, id);
    prevBlcoks && prevBlcoks !== blocks ? updatePageOnserver(blocks, id) : null;
  }, [blocks, prevBlcoks]);

  //block 삭제시 커서를 전 블럭 끝으로 위치
  useEffect(() => {});

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

/**
 * updatePageOnServer
 */
