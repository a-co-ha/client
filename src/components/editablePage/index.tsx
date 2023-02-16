import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  updatePageOnserver,
  addBlock,
  updateBlock,
  deleteBlock,
  onDragEnd,
} from './handlers';
import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
  DragStart,
} from 'react-beautiful-dnd';
import { usePrevious } from '@/hooks/usePrevious';
import { EditableBlock } from '@/components/editableBlock';
import { blocksState, currentBlockIdState } from '@/recoil/editableBlock/atom';
import type { AddBlock, page, block } from '../editablePage/types';

export const EditablePage = ({ id, fetchedBlocks, err }: page) => {
  const [blocks, setBlocks] = useRecoilState(blocksState);
  useEffect(() => {
    setBlocks(fetchedBlocks);
  }, []);
  const [currentBlockId, setCurrentBlockId] =
    useRecoilState(currentBlockIdState);
  const prevBlcoks = usePrevious(blocks);

  //block 변화시 put
  useEffect(() => {
    updatePageOnserver(blocks, id);
    prevBlcoks && prevBlcoks !== blocks ? updatePageOnserver(blocks, id) : null;
  }, [blocks, prevBlcoks]);

  //block 삭제시 커서를 전 블럭 끝으로 위치
  // useEffect(() => {});

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

  // const onDragEndHandler = (result: DropResult) => {
  //   const { destination, source } = result;

  //   // If we don't have a destination (due to dropping outside the droppable)
  //   // or the destination hasn't changed, we change nothing
  //   if (!destination || destination.index === source.index) {
  //     return;
  //   }

  //   const updatedBlocks = [...blocks];
  //   const removedBlocks = updatedBlocks.splice(source.index, 1);
  //   updatedBlocks.splice(destination.index, 0, removedBlocks[0]);
  //   setBlocks(updatedBlocks);
  // };

  console.log(blocks);
  return (
    <>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable key={id} droppableId="ddd">
          {(provided) => (
            <div
              // className="ddd"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {blocks.map((e: any, i: number) => (
                <Draggable
                  draggableId={`test-${e._id}`}
                  index={i}
                  key={`test-${e._id}`}
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <h3
                          css={{
                            outline: '1px solid limegreen',
                            padding: '10px',
                            margin: '5px',
                          }}
                        >
                          {e.html}
                        </h3>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
