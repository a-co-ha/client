import { useRecoilValue, useSetRecoilState } from 'recoil';
import { deleteImageOnServer } from './deleteImageOnServer';
import { block } from '../types';
import { blocksState } from '@/recoil/editableBlock/atom';

/**
 * updateBlockHandler와 마찬가지로 일치하는 index를 찾은 후,
 * splice로 지워주고 setBlocks로 업데이트.
 * 추가로 지운 블럭이 image를 가지고 있었다면, db에 deleteImageOnServer로 이미지도 지워줘야함
 */
export const deleteBlockHandler = (currentBlock: block) => {
  const blocks = useRecoilValue(blocksState);
  const setBlocks = useSetRecoilState(blocksState);
  const index = blocks.map((b) => b._id).indexOf(currentBlock._id);
  const deletedBlock = blocks[index];
  const updatedBlocks = [...blocks];
  updatedBlocks.splice(index, 1);
  setBlocks(updatedBlocks);
  deletedBlock.tag === 'img' && deletedBlock.imageUrl
    ? deleteImageOnServer(deletedBlock.imageUrl)
    : null;
};
