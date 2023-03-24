export interface editableBlock {
  key: string;
  position: number;
  id: string;
  tag: string;
  html: string;
  imgUrl: string | ArrayBuffer | null;
  pageId: string;
  addBlock: (currentBlock: AddBlock) => void;
  deleteBlock: (currentBlockId: string) => void;
  updateBlock: (currentBlock: Block) => void;
}
/**
 * interface block -> currentBlock에 할당했을 때 없는 속성때문에
 * 타입이 터지지않을까?
 */
export interface Block {
  blockId: string;
  tag: string;
  html: string;
  imgUrl: string | ArrayBuffer | null;
}

export interface EditablePages {
  id: string;
  fetchedBlocks: Block[];
  err: boolean;
}

// react-beautiful-dnd
// onDragStart
interface DraggableLocation {
  droppableId: string;
  index: number;
}

export interface DragStart {
  draggableId: string;
  type: string;
  source: DraggableLocation;
}
// onDragEnd
export interface DropResult {
  draggableId: string;
  type: string;
  source: DraggableLocation;
  destination: DraggableLocation | undefined | null;
}

//addBlock
export interface AddBlock {
  id: string;
  html: string;
  tag: string;
  imgUrl: string | ArrayBuffer | null;
  ref: HTMLDivElement | null;
}