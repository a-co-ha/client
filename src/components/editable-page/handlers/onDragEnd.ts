import type { Block } from '../types';
import type { DropResult } from 'react-beautiful-dnd';
/**
 *
 * result: DropResult type
 * result.draggableId: 드래그 되었던 Draggable의 id.
 * result.type: 드래그 되었던 Draggable의 type.
 * result.source: Draggable 이 시작된 위치(location).
 * result.destination: Draggable이 끝난 위치(location).
 * 만약에 Draggable이 시작한 위치와 같은 위치로 돌아오면 이 destination값은 null이 될것입니다
 */
export const onDragEnd = (blocks: Block[], result: DropResult) => {
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
