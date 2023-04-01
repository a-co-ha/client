interface Coordinates {
  x: number;
  y: number;
}
export interface TagSelectorMenuProps {
  position: Coordinates;
  handleTagSelection: (tag: string) => void;
  closeMenu: () => void;
}

export interface StateTypes {
  html: string;
  tag: string;
  imgUrl: string;
  previousKey: null | string;
  placeholder: boolean;
  openTagSelectorMenu: boolean;
  tagSelectorMenuPosition: Coordinates;
}
