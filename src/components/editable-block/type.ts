interface Coordinates {
  x: number;
  y: number;
}
export interface TagSelectorMenuProps {
  position: Coordinates;
  handleTagSelection: (tag: string) => void;
}

export interface StateTypes {
  htmlBackup: null | string;
  html: string;
  tag: string;
  imageUrl: string;
  previousKey: null | string;
  placeholder: boolean;
  openTagSelectorMenu: boolean;
  tagSelectorMenuPosition: Coordinates;
}
