export interface editableBlock {
  key: string;
  position: number;
  id: string;
  tag: string;
  html: string;
  imageUrl: string;
  pageId: string;
  addBlock: (currentBlock: block) => void;
  deleteBlock?: (currentBlock: block) => void;
  updateBlock: (currentBlock: block) => void;
}
/**
 * interface block -> currentBlock에 할당했을 때 없는 속성때문에
 * 타입이 터지지않을까?
 */
export interface block {
  _id: string;
  tag: string;
  html: string;
  imageUrl: string;
}

export interface page {
  id: string;
  fetchedBlocks: block[];
  err: string;
}

// react-beautiful-dnd
// onDragEnd type
export interface DraggableLocation {
  droppableId: string;
  index: number;
}
export interface DropResult {
  draggableId: string;
  type: string;
  source: DraggableLocation;
  destination: DraggableLocation | undefined | null;
}
