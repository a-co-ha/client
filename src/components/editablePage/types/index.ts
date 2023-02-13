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
  updateBlock?: (currentBlock: block) => void;
}

export interface block {
  _id: string;
  position: number;
  tag: string;
  html: string;
  imageUrl: string;
}

export interface page {
  id: string;
  fetchedBlocks: block[];
  err: string;
}
