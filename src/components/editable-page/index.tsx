import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { handlers } from './handlers';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { usePrevious } from '@/hooks/usePrevious';
import { EditableBlock } from '@/components/editable-block';
import { blocksState, currentBlockIdState } from '@/recoil/editable-block/atom';
import { toast } from 'react-toastify';
import { Notice } from '@/components/notice';
import * as styles from './styles';
import type { AddBlock, EditablePages, Block } from '../editable-page/types';

export const EditablePage = ({ id, fetchedBlocks, err }: EditablePages) => {
  if (err) {
    toast.error(`예기치못한 에러가 발생했어요!`);
    return null;
    // return <Notice status="ERROR" />;
  }
  const [blocks, setBlocks] = useRecoilState(blocksState);
  console.log(blocks);
  useEffect(() => {
    setBlocks(fetchedBlocks);
  }, []);
  const [_, setCurrentBlockId] = useRecoilState(currentBlockIdState);
  const prevBlcoks = usePrevious(blocks);
  const router = useRouter();
  const channelId = router.query.id;
  useEffect(() => {
    handlers.updatePageOnserver(blocks, id, channelId);
    prevBlcoks && prevBlcoks !== blocks
      ? handlers.updatePageOnserver(blocks, id, channelId)
      : null;
  }, [blocks, prevBlcoks]);

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
    <div css={styles.contentBox}>
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
                    imageUrl={block.imgUrl}
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
  );
};
