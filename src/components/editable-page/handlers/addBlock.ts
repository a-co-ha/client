import { nanoId } from '@/utils/nanoId';
import { Block, AddBlock } from '../types';

export const addBlock = (blocks: Block[], currentBlock: AddBlock) => {
  const index = blocks.map((b) => b.blockId).indexOf(currentBlock.id);
  const updatedBlocks = [...blocks];
  const newBlock = { blockId: nanoId(), tag: 'p', html: '', imageUrl: '' };
  updatedBlocks.splice(index + 1, 0, newBlock);
  updatedBlocks[index] = {
    ...updatedBlocks[index],
    tag: currentBlock.tag,
    html: currentBlock.html,
    imageUrl: currentBlock.imageUrl,
  };
  return updatedBlocks;
};
