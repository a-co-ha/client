import { nanoId } from '@/utils/nanoId';
import type { DropResult } from 'react-beautiful-dnd';
import axios from 'axios';
import { Block, AddBlock } from '../types';

const addBlock = (blocks: Block[], currentBlock: AddBlock) => {
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

/**
 * updateBlockHandler와 마찬가지로 일치하는 index를 찾은 후,
 * splice로 지워주고 setBlocks로 업데이트.
 * 추가로 지운 블럭이 image를 가지고 있었다면, db에 deleteImageOnServer로 이미지도 지워줘야함
 */
const deleteBlock = (blocks: Block[], currentBlockId: string) => {
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

/**
 * imageUrl endPoint로 요청하면 routing으로 fs.unlink(filePath) 함
 * backend/controllers/pages.js/deleteImage 참조
 *
 */
const deleteImageOnServer = async (imageUrl: string) => {
  try {
    const res = await axios.delete(`http://localhost:3000/pages/${imageUrl}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
  } catch (err) {
    return console.log(err);
  }
};

/**
 *
 * result: DropResult type
 * result.draggableId: 드래그 되었던 Draggable의 id.
 * result.type: 드래그 되었던 Draggable의 type.
 * result.source: Draggable 이 시작된 위치(location).
 * result.destination: Draggable이 끝난 위치(location).
 * 만약에 Draggable이 시작한 위치와 같은 위치로 돌아오면 이 destination값은 null이 될것입니다
 */
const onDragEnd = (blocks: Block[], result: DropResult) => {
  const { destination, source } = result;
  if (!destination || destination.index === source.index) {
    return;
  }
  /**
   * source와 destination의 index는 1부터 시작하나 봄.
   * 드래그 과정
   * 1. 드래그 중인 블럭을 지운다
   * 2. 목적지 블럭 index에 지운 블럭을 추가한다 (원래 블럭은 자동으로 밀림)
   */
  const updatedBlocks = [...blocks];
  const removedBlocks = updatedBlocks.splice(source.index, 1);
  updatedBlocks.splice(destination.index, 0, removedBlocks[0]);
  return updatedBlocks;
};

/**
 * 첫 getServerSideProps로 받아온 fetchedBlocks와 인자로받은 currentBlock의 일치하는 index를 찾음
 * updatedBlocks 변수를 만들어, 기존 blocks를 복사하고 인자로받은 currentBlock의 내용을 덮어씀
 * updatedBlocks로 setBlocks함
 * 추가로 imageUrl가 변하면 oldBlock변수로 체크, 다를 시 deleteImageOnserver handler 실행
 */
const updateBlock = (blocks: Block[], currentBlock: Block) => {
  const index = blocks.map((b) => b.blockId).indexOf(currentBlock.blockId);
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

const updatePageOnserver = async (blocks: Block[], id: string) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/pages/${id}`,
      {
        blocks,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    return console.log(err);
  }
};

export const handlers = {
  addBlock,
  deleteBlock,
  onDragEnd,
  updateBlock,
  updatePageOnserver,
};
