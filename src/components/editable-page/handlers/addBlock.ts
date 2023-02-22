import { nanoId } from '@/utils/nanoId';
import { block, AddBlock } from '../types';

export const addBlock = (blocks: block[], currentBlock: AddBlock) => {
  const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
  const updatedBlocks = [...blocks];
  const newBlock = { _id: nanoId(), tag: 'p', html: '', imageUrl: '' };
  updatedBlocks.splice(index + 1, 0, newBlock);
  updatedBlocks[index] = {
    ...updatedBlocks[index],
    tag: currentBlock.tag,
    html: currentBlock.html,
    imageUrl: currentBlock.imageUrl,
  };
  return updatedBlocks;
};
