import { useRecoilState } from 'recoil';
import { blocksState, currnetBlockIdState } from '@/recoil/editableBlock/atom';
import { addBlockHandler } from './handlers';
import { page } from '@/components/editablePage/types';
import { EditableBlock } from '../editableBlock';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export const EditablePage = ({ id, fetchedBlocks, err }: page) => {
  const [blocks, setBlocks] = useRecoilState(blocksState);
  setBlocks(fetchedBlocks);
  const [currnetBlockId, setCurrnetBlockId] =
    useRecoilState(currnetBlockIdState);

  const onDragEndHandler = (result: any) => {
    const { destination, source } = result;

    // If we don't have a destination (due to dropping outside the droppable)
    // or the destination hasn't changed, we change nothing
    if (!destination || destination.index === source.index) {
      return;
    }

    const updatedBlocks = [...blocks];
    const removedBlocks = updatedBlocks.splice(source.index - 1, 1);
    updatedBlocks.splice(destination.index - 1, 0, removedBlocks[0]);
    setBlocks(updatedBlocks);
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

deleteImageOnServer

addBlockHandler
updateBlockHandler
deleteBlockHandler
onDragEndHandler
 */
