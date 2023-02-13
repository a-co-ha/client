import { useRecoilValue, useSetRecoilState } from 'recoil';
import { blocksState, currnetBlockIdState } from '@/recoil/editableBlock/atom';
import { nanoId } from '@/utils/nanoId';
import { block } from '@/components/editablePage/types';

export const addBlockHandler = (currentBlock: block) => {
  const setCurrentBlockId = useSetRecoilState(currnetBlockIdState);
  setCurrentBlockId(currentBlock._id);
  const blocks = useRecoilValue(blocksState);
  const index = blocks.map((b) => b._id).indexOf(currentBlock._id);
  const updatedBlocks = [...blocks];
  const newBlock = { _id: nanoId(), tag: 'p', html: '', imageUrl: '' };
  updatedBlocks.splice(index + 1, 0, newBlock);
  updatedBlocks[index] = {
    ...updatedBlocks[index],
    tag: currentBlock.tag,
    html: currentBlock.html,
    imageUrl: currentBlock.imageUrl,
  };
  const setBlocks = useSetRecoilState(blocksState);
  setBlocks(updatedBlocks);
};
