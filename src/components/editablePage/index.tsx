import { useRecoilState } from 'recoil';
import { blocksState, currnetBlockIdState } from '@/recoil/editableBlock/atom';
import { addBlockHandler } from './handlers';
import { page } from '@/components/editablePage/types';
import { EditableBlock } from '../editableBlock';

export const EditablePage = ({ id, fetchedBlocks, err }: page) => {
  const [blocks, setBlocks] = useRecoilState(blocksState);
  setBlocks(fetchedBlocks);
  const [currnetBlockId, setCurrnetBlockId] =
    useRecoilState(currnetBlockIdState);

  console.log(id, fetchedBlocks);
  return (
    <div>
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
    </div>
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
