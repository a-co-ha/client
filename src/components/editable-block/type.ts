import { ob } from '../editable-block/index';

export interface TagSelectorMenuProps {
  position: ob;
  handleTagSelection: (tag: string) => void;
}
