import { deleteImageOnServer } from './deleteImageOnServer';
import { Block } from '../types';

/**
 * updateBlockHandler와 마찬가지로 일치하는 index를 찾은 후,
 * splice로 지워주고 setBlocks로 업데이트.
 * 추가로 지운 블럭이 image를 가지고 있었다면, db에 deleteImageOnServer로 이미지도 지워줘야함
 */
export const deleteBlock = (blocks: Block[], currentBlockId: string) => {
  if (blocks.length > 1) {
    const index = blocks.map((b) => b.blockId).indexOf(currentBlockId);
    const deletedBlock = blocks[index];
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index, 1);
    deletedBlock.tag === 'img' && deletedBlock.imageUrl
      ? deleteImageOnServer(deletedBlock.imageUrl)
      : null;
    return updatedBlocks;
  }
};
