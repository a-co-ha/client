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

export interface UserInChannel {
  admin: boolean;
  channelId: string;
  channelName: string;
  channel_id: string;
  id: number;
  name: string;
  'user.img': string;
  'user.user_id': number;
  userId: number;
  user_id: number;
}
