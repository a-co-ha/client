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
import { Notice } from '@/components/Notice';
import type { AddBlock, page, block } from '../editable-page/types';
import Label from '../editable-block/Label';

export const EditablePage = ({ id, fetchedBlocks, err }: page) => {
  if (err) {
    return <Notice status="ERROR" />;
  }
  const [blocks, setBlocks] = useRecoilState(blocksState);
  useEffect(() => {
    setBlocks(fetchedBlocks);
  }, []);
  const [currentBlockId, setCurrentBlockId] =
    useRecoilState(currentBlockIdState);
  const prevBlcoks = usePrevious(blocks);
  const router = useRouter();

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
    updatedBlocks && setBlocks(updatedBlocks);
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
  const isNewPage = router.query.public === 'true';
  console.log(blocks);
  return (
    <>
      {isNewPage && <Notice status="SUCCESS" />}
      <Label />
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable key={id} droppableId={id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {blocks.map((block) => {
                const position = blocks.map((b) => b._id).indexOf(block._id);
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
