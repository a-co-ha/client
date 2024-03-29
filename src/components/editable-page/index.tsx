import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { channelSidebarOpenState } from '@/recoil/project/atom';
import { handlers } from './handlers';
import {
  DragDropContext,
  Droppable,
  DropResult,
  resetServerContext,
} from 'react-beautiful-dnd';
import Label from '../editable-block/Label';
import { useGetEditablePage } from '@/hooks/queries/editable/getPage';
import { EditableBlock } from '@/components/editable-block';
import { currentBlockIdState } from '@/recoil/editable-block/atom';
import * as styles from './styles';
import type { AddBlock, EditablePages, Block } from './type';
import { ErrorBoundary } from '../error-boundary/index';
import { Error } from '../error-boundary/Error';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import useDidMountEffect from '@/hooks/useDidMountEffect';

export const EditablePage = ({ channelId, pageId, type }: EditablePages) => {
  resetServerContext();
  const setIsChannelSidebarOpen = useSetRecoilState(channelSidebarOpenState);
  const onClickHandler = () => {
    if (window !== undefined) {
      window.innerWidth <= 450 ? setIsChannelSidebarOpen(false) : null;
    }
  };

  const { data: fetchedBlocks } = useGetEditablePage(channelId, pageId, type);
  // return <Notice status="ERROR" />;
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [_, setCurrentBlockId] = useRecoilState(currentBlockIdState);
  const router = useRouter();
  const page = useRef<HTMLDivElement | null>(null);
  // const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);

  useEffect(() => {
    setBlocks(fetchedBlocks);
  }, [fetchedBlocks, pageId]);

  useDidMountEffect(() => {
    // setSelectedBlocks([]);
    if (fetchedBlocks !== blocks) {
      handlers.updatePageOnserver(blocks, pageId, channelId);
    }
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

  // const deleteSelectBlock = () => {
  //   if (confirm('선택된 블럭을 삭제하시겠습니까?')) {
  //     const curBlocks = blocks.filter(
  //       (block) => !selectedBlocks.includes(block.blockId)
  //     );
  //     setBlocks(curBlocks);
  //   }
  // };

  // const handleDeleteBlocks = (e: React.KeyboardEvent) => {
  //   e.key === 'Delete' && deleteSelectBlock();
  // };

  const handleClose = () => {
    const parentPageInfo = JSON.parse(
      localStorage.getItem('parentPageInfo') || ''
    );
    const parentPageId = localStorage.getItem('parentPageId') || '';
    const [channelId, parentPageType, parentPageName] = parentPageInfo;
    router.push(
      `/project/${channelId}/${parentPageId}?name=${parentPageName}&type=${parentPageType}`
    );
  };

  return (
    <div css={styles.Conatainer(type)} onClick={onClickHandler}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary fallback={Error} onReset={reset}>
            <div css={styles.contentBox} ref={page}>
              {(type === 'progress-page' || type === 'normal-page') && (
                <button onClick={handleClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 opacity-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                </button>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Label />
                {/* {selectedBlocks.length > 0 && (
                  <button onClick={deleteSelectBlock}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                )} */}
              </div>
              <DragDropContext onDragEnd={onDragEndHandler}>
                <Droppable key={pageId} droppableId={pageId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="container"
                      // onKeyDown={handleDeleteBlocks}
                    >
                      {/* <Selecto
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
                      /> */}
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
