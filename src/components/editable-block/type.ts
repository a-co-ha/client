interface Coordinates {
  x: number;
  y: number;
}
export interface TagSelectorMenuProps {
  position: Coordinates;
  handleTagSelection: (tag: string) => void;
  closeMenu: () => void;
}

export interface NameSelectorMenuProps {
  position: Coordinates;
  handleNameSelector: (tag: string) => void;
  closeMenu: () => void;
}

export interface StateTypes {
  htmlBackup: null | string;
  html: string;
  tag: string;
  imageUrl: any;
  previousKey: null | string;
  placeholder: boolean;
  openTagSelectorMenu: boolean;
  tagSelectorMenuPosition: Coordinates;
  openNameSelectorMenu: boolean;
}
