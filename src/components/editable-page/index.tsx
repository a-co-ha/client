import { useState, useEffect, useRef } from 'react';
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
import Selecto from 'react-selecto';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EditablePage = ({ channelId, pageId, type }: EditablePages) => {
  const { data: fetchedBlocks } = useGetEditablePage(channelId, pageId, type);
  // return <Notice status="ERROR" />;
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [_, setCurrentBlockId] = useRecoilState(currentBlockIdState);
  const router = useRouter();
  const page = useRef<HTMLDivElement | null>(null);
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);

  useEffect(() => {
    setBlocks(fetchedBlocks);
  }, [fetchedBlocks, pageId]);

  useDidMountEffect(() => {
    setSelectedBlocks([]);
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

  function deleteSelectBlock() {
    if (confirm('선택된 블럭을 삭제하시겠습니까?')) {
      const curBlocks = blocks.filter(
        (block) => !selectedBlocks.includes(block.blockId)
      );
      setBlocks(curBlocks);
    }
  }

  const handleDeleteBlocks = (e: React.KeyboardEvent) => {
    e.key === 'Delete' && deleteSelectBlock();
  };

  return (
    <div
      style={{
        ...(type !== 'normal'
          ? {
              width: '60%',
            }
          : { width: '100%' }),
      }}
    >
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={Error} onReset={reset}>
            <div css={styles.contentBox} ref={page}>
              {isNewPage && <Notice status="SUCCESS" />}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Label />
                {selectedBlocks.length > 0 && (
                  <button onClick={deleteSelectBlock}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                )}
              </div>
              <DragDropContext onDragEnd={onDragEndHandler}>
                <Droppable key={pageId} droppableId={pageId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="container"
                      onKeyDown={handleDeleteBlocks}
                    >
                      <Selecto
                        dragContainer={'.container'}
                        selectableTargets={['.list']}
                        hitRate={0}
                        selectByClick={false}
                        selectFromInside={true}
                        continueSelect={false}
                        continueSelectWithoutDeselect={true}
                        ratio={0}
                        onSelect={(e) => {
                          e.added.forEach((el) => {
                            el.classList.add('selected');
                            setSelectedBlocks((prev: any) => {
                              return [...prev, el.dataset['id']];
                            });
                          });
                          e.removed.forEach((el) => {
                            el.classList.remove('selected');
                            setSelectedBlocks([]);
                          });
                        }}
                      ></Selecto>
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
    </div>
  );
};
