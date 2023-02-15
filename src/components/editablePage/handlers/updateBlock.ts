import { block } from '../types';
import { deleteImageOnServer } from './deleteImageOnServer';

/**
 * 첫 getServerSideProps로 받아온 fetchedBlocks와 인자로받은 currentBlock의 일치하는 index를 찾음
 * updatedBlocks 변수를 만들어, 기존 blocks를 복사하고 인자로받은 currentBlock의 내용을 덮어씀
 * updatedBlocks로 setBlocks함
 * 추가로 imageUrl가 변하면 oldBlock변수로 체크, 다를 시 deleteImageOnserver handler 실행
 */
export const updateBlock = (blocks: block[], currentBlock: block) => {
  const index = blocks.map((b) => b._id).indexOf(currentBlock._id);
  const oldBlock = blocks[index];
  const updatedBlocks = [...blocks];
  updatedBlocks[index] = {
    ...updatedBlocks[index],
    tag: currentBlock.tag,
    html: currentBlock.html,
    imageUrl: currentBlock.imageUrl,
  };
  oldBlock.imageUrl !== currentBlock.imageUrl
    ? deleteImageOnServer(oldBlock.imageUrl)
    : null;
  return updatedBlocks;
};
