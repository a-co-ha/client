import { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { handlers } from './handlers';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import Label from '../editable-block/Label';
import { EditableBlock } from '@/components/editable-block';
import { Notice } from '../notice/index';
import { usePrevious } from '../../hooks/usePrevious';
import { blocksState, currentBlockIdState } from '@/recoil/editable-block/atom';
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
  const [blocks, setBlocks] = useState<Block[]>([]);
  // const [blocks, setBlocks] = useState<Block[]>(() => {
  //   console.log('블락스 초기값');
  //   return fetchedBlocks;
  // });
  const [_, setCurrentBlockId] = useRecoilState(currentBlockIdState);
  // const prevBlcoks = usePrevious(blocks);
  const router = useRouter();
  const channelId = router.query.id;

  console.log('블락스', blocks);
  console.log('서버에서 넘어온 블락스', fetchedBlocks);

  useLayoutEffect(() => {
    console.log('블락스 서버블락스로 변경');
    setBlocks(fetchedBlocks);
  }, [router.query.pageId]);

  useEffect(() => {
    console.log('서버 블락스 업데이트');
    handlers.updatePageOnserver(blocks, id, channelId);
    // prevBlcoks && prevBlcoks !== blocks
    //   ? handlers.updatePageOnserver(blocks, id, channelId)
    //   : null;
    // return;
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
